#!/usr/bin/env python3
"""Generate the course's Swedish audio clips with OmniVoice.

Workflow:
  1. Read assets/audio/manifest.json.
  2. Find clips that don't exist yet in assets/audio/sv/ (<id>.mp3 or <id>.wav).
  3. Load OmniVoice once and synthesize each missing clip in Swedish.
  4. Convert to MP3 (via ffmpeg) and place it at assets/audio/sv/<id>.mp3.

Voice (for a consistent voice across all clips), first match wins:
  --ref-audio PATH [--ref-text TXT]  → voice cloning from your own reference
  (macOS default) `say -v Alva`      → auto-make a Swedish reference, then clone it
  --instruct "female, ..."           → voice design (no reference)
  else                               → auto voice (model picks one)

Run it through OmniVoice's virtualenv — the wrapper does this for you:
  bash scripts/generate_audio_omnivoice.sh                 # all missing clips
  bash scripts/generate_audio_omnivoice.sh --limit 5       # try a few first
  bash scripts/generate_audio_omnivoice.sh --force         # regenerate everything
  bash scripts/generate_audio_omnivoice.sh --ref-audio me.wav --ref-text "..."
"""
import argparse
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

PROJECT = Path(__file__).resolve().parent.parent
DEFAULT_MANIFEST = PROJECT / "assets" / "audio" / "manifest.json"
DEFAULT_OUT = PROJECT / "assets" / "audio" / "sv"

# A short Swedish sentence used to build the reference voice with macOS `say`.
SAY_REF_TEXT = "Hej och välkommen! Nu ska vi lära oss lite svenska tillsammans."


def log(msg):
    print(msg, flush=True)


def parse_args():
    p = argparse.ArgumentParser(description="Generate Swedish audio with OmniVoice.")
    p.add_argument("--manifest", type=Path, default=DEFAULT_MANIFEST)
    p.add_argument("--out-dir", type=Path, default=DEFAULT_OUT)
    p.add_argument("--model", default="k2-fsa/OmniVoice")
    p.add_argument("--language", default="sv", help="Target language (name or code). Default: sv (Swedish).")
    p.add_argument("--device", default=None, help="cpu / mps / cuda:0 (default: auto-detect).")
    p.add_argument("--ref-audio", type=Path, default=None, help="Reference audio for voice cloning.")
    p.add_argument("--ref-text", default=None, help="Transcript of --ref-audio (else auto-ASR).")
    p.add_argument("--instruct", default=None, help="Voice-design attributes, e.g. 'female, medium pitch'.")
    p.add_argument("--no-say-ref", action="store_true", help="Don't auto-build a reference with macOS `say`.")
    p.add_argument("--say-voice", default="Alva", help="macOS Swedish voice for the auto reference (Alva).")
    p.add_argument("--num-step", type=int, default=32, help="Diffusion steps (16 = faster, 32 = better).")
    p.add_argument("--speed", type=float, default=0.95, help="Speaking rate (<1 slower; good for learners).")
    p.add_argument("--format", choices=["mp3", "wav"], default="mp3")
    p.add_argument("--force", action="store_true", help="Regenerate clips even if they already exist.")
    p.add_argument("--limit", type=int, default=0, help="Only generate the first N missing clips (0 = all).")
    p.add_argument("--dry-run", action="store_true", help="List what would be generated, then exit (no model load).")
    return p.parse_args()


def existing(out_dir: Path, clip_id: str):
    for ext in (".mp3", ".wav"):
        f = out_dir / (clip_id + ext)
        if f.exists() and f.stat().st_size > 0:
            return f
    return None


def make_say_reference(voice: str, tmpdir: Path):
    """Create a Swedish reference clip with macOS `say`; return (wav_path, text) or None."""
    if not shutil.which("say"):
        return None
    aiff = tmpdir / "ref.aiff"
    wav = tmpdir / "ref.wav"
    try:
        subprocess.run(["say", "-v", voice, "-o", str(aiff), SAY_REF_TEXT], check=True)
    except (subprocess.CalledProcessError, FileNotFoundError):
        return None
    # Convert AIFF → WAV. Prefer ffmpeg; fall back to soundfile.
    if shutil.which("ffmpeg"):
        subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(aiff), str(wav)], check=True)
    else:
        import soundfile as sf
        data, sr = sf.read(str(aiff))
        sf.write(str(wav), data, sr)
    return (wav, SAY_REF_TEXT)


def to_mp3(wav_path: Path, mp3_path: Path):
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(wav_path),
         "-codec:a", "libmp3lame", "-qscale:a", "4", str(mp3_path)],
        check=True,
    )


def main():
    args = parse_args()

    if not args.manifest.exists():
        log(f"❌ Manifest not found: {args.manifest}\n   Run: node scripts/build_manifest.js")
        sys.exit(1)
    manifest = json.loads(args.manifest.read_text())
    args.out_dir.mkdir(parents=True, exist_ok=True)

    # 1) Which clips are missing?
    missing = [e for e in manifest if args.force or not existing(args.out_dir, e["id"])]
    if args.limit > 0:
        missing = missing[: args.limit]

    total = len(manifest)
    present = sum(1 for e in manifest if existing(args.out_dir, e["id"]))
    log(f"Manifest: {total} clips · already on disk: {present}")
    if not missing:
        log("✓ Nothing to do — every clip already exists. (Use --force to regenerate.)")
        return
    log(f"To generate: {len(missing)} clip(s) → {args.out_dir}")

    if args.dry_run:
        for e in missing:
            log(f"  · {e['id']}  «{e['swedish']}»")
        log("(dry run — nothing generated)")
        return

    want_mp3 = args.format == "mp3"
    if want_mp3 and not shutil.which("ffmpeg"):
        log("⚠ ffmpeg not found — writing .wav instead of .mp3 (the site plays both).")
        want_mp3 = False

    # 2) Load OmniVoice once.
    log(f"Loading OmniVoice ({args.model}) … first run downloads the model from Hugging Face.")
    import torch
    from omnivoice import OmniVoice
    from omnivoice.utils.common import get_best_device

    device = args.device or get_best_device()
    log(f"Device: {device}")
    model = OmniVoice.from_pretrained(args.model, device_map=device, dtype=torch.float16)

    import soundfile as sf

    with tempfile.TemporaryDirectory() as td:
        tmp = Path(td)

        # 3) Decide the voice and build a reusable prompt if cloning.
        gen_common = {"language": args.language, "num_step": args.num_step, "speed": args.speed}
        clone_prompt = None
        ref_audio = ref_text = instruct = None

        if args.ref_audio:
            log(f"Voice: cloning from {args.ref_audio}")
            clone_prompt = model.create_voice_clone_prompt(ref_audio=str(args.ref_audio), ref_text=args.ref_text)
        elif not args.no_say_ref and not args.instruct:
            ref = make_say_reference(args.say_voice, tmp)
            if ref:
                log(f"Voice: cloning a Swedish reference made with macOS `say -v {args.say_voice}`")
                clone_prompt = model.create_voice_clone_prompt(ref_audio=str(ref[0]), ref_text=ref[1])
        if clone_prompt is None:
            if args.instruct:
                log(f"Voice: voice design — '{args.instruct}'")
                instruct = args.instruct
            else:
                log("Voice: auto (model picks a voice; may vary per clip)")

        # 4) Generate each clip.
        ok, fail = 0, 0
        for i, e in enumerate(missing, 1):
            cid, text = e["id"], e["swedish"]
            try:
                kwargs = dict(text=text, **gen_common)
                if clone_prompt is not None:
                    kwargs["voice_clone_prompt"] = clone_prompt
                elif instruct:
                    kwargs["instruct"] = instruct
                audio = model.generate(**kwargs)
                wav_tmp = tmp / (cid + ".wav")
                sf.write(str(wav_tmp), audio[0], model.sampling_rate)
                if want_mp3:
                    to_mp3(wav_tmp, args.out_dir / (cid + ".mp3"))
                else:
                    shutil.move(str(wav_tmp), str(args.out_dir / (cid + ".wav")))
                ok += 1
                log(f"  [{i}/{len(missing)}] ✓ {cid}  «{text}»")
            except Exception as ex:  # keep going on a single failure
                fail += 1
                log(f"  [{i}/{len(missing)}] ✗ {cid}: {ex}")

    log(f"\nDone. Generated {ok} clip(s)" + (f", {fail} failed" if fail else "") + f" in {args.out_dir}")
    log("Reload the site — the 🔊 buttons now use your OmniVoice recordings.")
    if fail:
        sys.exit(1)


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        log("\nInterrupted.")
        sys.exit(130)
