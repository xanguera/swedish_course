/* i18n_pt.js — Português europeu (European Portuguese).
   UI strings + full content translation pack. Swedish (`sv`) is never
   translated; only the L1-facing text. Uses EP vocabulary throughout
   (autocarro, comboio, elétrico, pequeno-almoço, casa de banho, etc.). */
(function () {
  "use strict";
  var I = LSV.i18n;

  I.registerUI("pt", {
    tab_learn: "Aprender", tab_practice: "Praticar", tab_culture: "Cultura", tab_phrases: "Frases",
    foot_check: "VERIFICAR", foot_continue: "CONTINUAR",
    node_start: "COMEÇAR", node_continue: "CONTINUAR",

    fc_title: "Palavras novas — toca num cartão para virar",
    fc_hint: "toca no cartão para ver o significado",
    fc_back: "‹ Voltar", fc_next: "Seguinte ›",
    q_which: "Que palavra é esta?",
    q_meaning: "O que significa isto?",
    q_listen: "Toca no que ouves",
    q_listen_hint: "Ouve e depois escolhe",
    q_match: "Liga os pares",
    q_fill: "Preenche o espaço",
    q_repeat: "Ouve e depois diz em voz alta 🎤",
    said: "Já disse! 🎤", said_last: "Já disse! ✅",
    fb_notquite: "Quase!", fb_answer: "Resposta: ",
    match_praise: "Ligaste todos — boa persistência!",
    didyouknow: "Sabias que?",

    hero_hi_t: "Hej! Jag heter Älgot.", hero_hi_s: "Olá! Sou o Älgot. Vamos aprender sueco!",
    hero_keep_t: "Bra jobbat! Continua.", hero_keep_s: "{done} de {total} lições concluídas",
    hero_done_t: "Grattis! Conseguiste!", hero_done_s: "Terminaste o curso todo 🎉",
    audio_tip: "Dica: o áudio usa a voz sueca do teu navegador. Se não ouvires, experimenta o Safari ou o Chrome, ou adiciona as tuas gravações mais tarde.",
    made_with: "Feito com ❤️ para a nossa viagem a Estocolmo",
    phrasebook_link: "Livro de frases",
    unit_word: "Unidade",

    culture_title: "Visste du? 🇸🇪", culture_sub: "Sabias que? — tradições suecas e factos sobre Estocolmo",
    phrase_title: "Livro de frases 📖", phrase_sub: "Todas as palavras e frases — toca em 🔊 para ouvir. Ótimo para levar contigo!",
    phrase_empty: "Termina uma lição para desbloqueares as suas palavras aqui.",
    practice_title: "Praticar 🔁",
    practice_empty: "Aprende primeiro algumas lições e depois volta aqui para rever as palavras que já viste.",
    practice_go: "Ir para as lições",
    practice_intro: "Recorda as palavras que aprendeste — as mais fracas primeiro. Boa para o avião!",
    practice_start: "Começar revisão ({n} palavras)",

    toast_locked_path: "Termina primeiro as lições anteriores 🔒",
    toast_locked: "Essa lição ainda está bloqueada 🔒",
    celebrate_t: "Bra jobbat!", celebrate_s: "Bom trabalho — lição concluída!",
    celebrate_review_t: "Revisão concluída!", celebrate_review_s: "Boa revisão 🔁",
    reward_xp: "XP", reward_acc: "Precisão",

    welcome_title: "Välkommen!",
    welcome_sub: "Aprende um pouco de sueco para uma viagem em família a Estocolmo — palavras, frases e curiosidades, um pequeno passo de cada vez.",
    welcome_btn: "Começar",
    setup_title: "Configura o teu curso",
    setup_name: "O teu nome",
    setup_name_placeholder: "ex.: Alex",
    setup_l1: "Eu falo",
    setup_l2: "Quero aprender",
    setup_l2_note: "Mais idiomas em breve",
    setup_btn: "Começar a aprender",
    setup_close: "Fechar",

    settings_title: "Definições",
    settings_save_btn: "Guardar",
    settings_reset_title: "Zona de perigo",
    settings_reset_desc: "Apaga todas as tuas lições, XP, sequência e palavras guardadas. Não é possível desfazer.",
    settings_reset_btn: "Repor todo o progresso",
    settings_reset_confirm: "Repor todo o progresso? Isto apaga para sempre as tuas lições, XP, sequência e palavras guardadas.",
    settings_reset_done: "Progresso reposto",

    // perfis de família — um dispositivo, vários aprendizes, cada um com o
    // seu nome, par de idiomas e progresso (guardado localmente, não partilhado)
    profile_section_label: "Membros da família neste dispositivo",
    profile_unnamed: "Sem nome",
    profile_add_btn: "+ Adicionar familiar",
    profile_add_title: "Adicionar um familiar",
    toast_profile_switched: "Mudou para {name}",

    // offline
    offline_title: "Offline",
    offline_ready: "Já está tudo descarregado — o curso funciona totalmente offline. 🎉",
    offline_not_ready: "A aplicação já funciona offline. Descarrega também o áudio, para todas as palavras tocarem sem ligação — ótimo para o avião ou sem dados em Estocolmo.",
    offline_btn: "Descarregar para usar offline",
    offline_progress: "A descarregar… {done}/{total}",
    offline_done: "Descarregado! Já está disponível offline.",
    offline_error: "Não foi possível descarregar agora — verifica a ligação e tenta de novo.",
    offline_unsupported: "O download offline não está disponível neste navegador."
  });

  var t = function (t, note) { return { t: t, note: note || "" }; };

  I.registerContent("pt", {
    vocab: {
      // Unit 1
      hej: t("olá", "A saudação para qualquer altura do dia."),
      god_morgon: t("bom dia", "Usa-se até por volta das 10–11h."),
      god_kvall: t("boa noite", "'kväll' = fim de tarde/noite. O 'ä' soa como o 'é'."),
      hej_da: t("adeus", "O 'adeus' do dia a dia. O 'å' soa como 'ó'."),
      tack: t("obrigado(a)", "Também serve de 'por favor' ao pedir: 'en kaffe, tack'."),
      tack_sa_mycket: t("muito obrigado(a)", "Um agradecimento mais caloroso."),
      varsagod: t("de nada / aqui tens", "Diz-se ao dar algo ou a responder a um obrigado."),
      ja: t("sim", "Soa como 'iá'."),
      nej: t("não", "Soa como 'nei'."),
      ursakta: t("desculpe / com licença", "Para chamar a atenção ou pedir passagem."),
      forlat: t("desculpa (a sério)", "Um pedido de desculpa a sério, mais forte que 'ursäkta'."),
      snalla: t("por favor (a pedir)", "Usa-se quando se pede mesmo um favor."),
      talar_du_engelska: t("Fala inglês?", "A tua frase salva-vidas — quase todos os suecos falam!"),
      jag_forstar_inte: t("Não percebo", "'inte' = não."),
      jag_heter: t("Chamo-me…", "'heter' = chamo-me. Acrescenta o teu nome a seguir."),

      // Unit 2
      jag: t("eu", "Pronuncia-se 'iá'."),
      du: t("tu", "Os suecos usam o informal 'du' com quase toda a gente."),
      han: t("ele"),
      hon: t("ela"),
      vad_heter_du: t("Como te chamas?", "Responde com 'Jag heter…'."),
      mamma: t("mãe"),
      pappa: t("pai"),
      syster: t("irmã"),
      bror: t("irmão"),
      familj: t("família", "O 'j' soa como o 'i' de 'ioga'."),
      hur_mar_du: t("Como estás?", "'mår' = sentir-se."),
      bra: t("bem", "Responde: 'Bra, tack!' = Bem, obrigado!"),
      var_kommer_du_ifran: t("De onde és?"),
      jag_kommer_fran: t("Eu venho de…", "Acrescenta o teu país: '…Portugal'."),

      // Unit 3 — numbers
      noll: t("zero"), ett: t("um", "Também é o artigo 'ett'."),
      tva: t("dois"), tre: t("três"), fyra: t("quatro"), fem: t("cinco"),
      sex: t("seis"), sju: t("sete", "O som 'sju' é um 'h' suave — muito sueco!"),
      atta: t("oito"), nio: t("nove"), tio: t("dez"),
      elva: t("onze"), tolv: t("doze"), tretton: t("treze", "'-ton' marca os números 13–19."),
      fjorton: t("catorze"), femton: t("quinze"), sexton: t("dezasseis"),
      sjutton: t("dezassete"), arton: t("dezoito"), nitton: t("dezanove"),
      tjugo: t("vinte", "O 'tj' é um som suave, tipo 'ch'."),
      trettio: t("trinta"), fyrtio: t("quarenta"), hundra: t("cem", "'ett hundra' = cem."),
      hur_mycket_kostar_det: t("Quanto custa?", "A tua pergunta-chave nas compras."),
      kronor: t("coroas (SEK)", "A moeda da Suécia. 1 krona, várias kronor."),
      dyrt: t("caro"), billigt: t("barato"),
      jag_vill_ha: t("Eu quero…", "'ha' = ter. Acrescenta o que queres."),
      en: t("um/uma (palavra 'en')", "Cerca de 75% dos nomes são palavras 'en': en bulle, en buss."),
      ett_art: t("um/uma (palavra 'ett')", "Os restantes são palavras 'ett': ett tåg, ett foto."),
      det_har: t("isto", "Aponta e diz isto nas compras."),

      // Unit 4
      kaffe: t("café", "O combustível da vida sueca."),
      te: t("chá"),
      bulle: t("pãozinho doce", "Um pão doce."),
      kanelbulle: t("pão de canela", "A estrela do fika sueco. 'kanel' = canela."),
      kaka: t("bolacha / bolo"),
      jag_skulle_vilja_ha: t("Gostaria de…", "Mais educado que 'jag vill ha'."),
      en_kaffe_tack: t("Um café, por favor", "Um pedido simples no café."),
      frukost: t("pequeno-almoço"),
      lunch: t("almoço"),
      middag: t("jantar", "Historicamente 'meio-dia', mas hoje = jantar."),
      vatten: t("água", "A água da torneira é excelente e gratuita."),
      mjolk: t("leite", "'mj' soa como 'mi'."),
      notan_tack: t("A conta, por favor", "Pede isto no restaurante."),
      smaklig_maltid: t("Bom apetite", "O 'bom apetite' sueco."),

      // Unit 5
      tunnelbana: t("metro", "Os locais chamam-lhe 'T-bana'."),
      buss: t("autocarro"),
      tag: t("comboio", "Uma palavra 'ett': ett tåg."),
      sparvagn: t("elétrico", "A linha 7 vai até Djurgården."),
      biljett: t("bilhete", "Instala a app SL antes de viajar."),
      var_ar: t("Onde é…?", "A seguir, diz um lugar."),
      till: t("para / a"),
      fran: t("de"),
      hoger: t("direita"),
      vanster: t("esquerda"),
      rakt_fram: t("sempre em frente"),

      // Unit 6
      gamla_stan: t("a Cidade Velha", "O belo centro medieval de Estocolmo."),
      slottet: t("o palácio", "O Palácio Real — vê a troca da guarda!"),
      museet: t("o museu", "O Vasa e o Skansen são visitas obrigatórias."),
      kyrka: t("igreja"),
      torg: t("praça", "Stortorget é a praça principal de Gamla stan."),
      oppettider: t("horário de funcionamento", "Confirma antes de ires."),
      var_ar_toaletten: t("Onde é a casa de banho?", "As casas de banho públicas custam muitas vezes 5–10 kronor."),
      kan_jag_ta_ett_foto: t("Posso tirar uma foto?", "É educado perguntar dentro de edifícios ou a pessoas.")
    },

    lessons: {
      l01: "Dizer olá",
      l02: "Obrigado, sim e não",
      l03: "Desculpe e perdão",
      l04: "As tuas primeiras frases",
      l05: "Eu e tu",
      l06: "Família",
      l07: "Conversa de circunstância",
      l08: "Números 0–10",
      l09: "Números 11–100",
      l10: "Falar de compras",
      l11: "Eu quero isto — en / ett",
      l12: "Hora do fika",
      l13: { title: "Pedir num café", fill: "Um café, por favor" },
      l14: "Refeições e bebidas",
      l15: "Deslocar-se",
      l16: { title: "Direções", fill: "Onde é o metro?" },
      l17: "Lugares para ver",
      l18: { title: "Perguntas úteis", fill: "Onde é a casa de banho?" }
    },

    units: {
      u1: "Sobrevivência básica",
      u2: "Conhecer pessoas",
      u3: "Números e compras",
      u4: "Comida e fika",
      u5: "Deslocações",
      u6: "Turismo"
    },

    modules: {
      m1: "Saudações", m2: "Ser educado", m3: "Tu e eu", m4: "Conversa",
      m5: "Contar", m6: "Nas compras", m7: "Fika", m8: "Refeições",
      m9: "Transportes e direções", m10: "Por Estocolmo"
    },

    culture: {
      fika: { title: "O fika é sagrado",
        body: "O <b class='sv-hl'>fika</b> é o ritual sueco de fazer uma pausa para um café e algo doce — normalmente um <b class='sv-hl'>kanelbulle</b> (pão de canela). É substantivo e verbo: podes <i>fika</i> com amigos. Nos locais de trabalho para-se todos os dias para isso. Nunca dispenses o fika!" },
      lagom: { title: "Lagom — nem demais, nem de menos",
        body: "<b class='sv-hl'>Lagom</b> significa 'na medida certa'. Não há uma palavra exata em português. Resume toda a ideia sueca de equilíbrio e moderação — no café, no trabalho, na vida." },
      pippi: { title: "A Pippi das Meias Altas é sueca",
        body: "A menina ruiva e super-forte <b class='sv-hl'>Pippi Långstrump</b> foi criada pela autora sueca Astrid Lindgren. Podes conhecê-la no <b class='sv-hl'>Junibacken</b>, um museu de histórias em Djurgården — perfeito para crianças!" },
      pant: { title: "Recebe dinheiro pelas garrafas",
        body: "Ao comprares uma bebida, pagas um pequeno depósito chamado <b class='sv-hl'>pant</b>. Devolve a lata ou garrafa vazia numa máquina (<b class='sv-hl'>pantmaskin</b>) em qualquer supermercado e recebes as tuas kronor de volta. As crianças adoram fazer isto!" },
      cashless: { title: "A Suécia quase não usa dinheiro",
        body: "Podes pagar com <b class='sv-hl'>kort</b> (cartão) ou telemóvel em quase todo o lado — até por um único pão. Muitos sítios não aceitam dinheiro, por isso raramente precisas de <b class='sv-hl'>kronor</b> no bolso." },
      tbana_art: { title: "A maior galeria de arte do mundo",
        body: "O <b class='sv-hl'>tunnelbana</b> (metro) de Estocolmo é famoso pelas estações escavadas e pintadas como grutas e galerias. T-Centralen e Solna são deslumbrantes — anda de metro só para olhar para cima!" },
      allemansratten: { title: "O direito de acesso à natureza",
        body: "<b class='sv-hl'>Allemansrätten</b> — o 'direito de todos' — permite a qualquer pessoa caminhar, nadar e apanhar bagas na natureza, mesmo em terrenos privados, desde que com respeito. A Suécia adora o ar livre." },
      kanelbullens_dag: { title: "Dia do Pão de Canela",
        body: "O dia 4 de outubro é o <b class='sv-hl'>Kanelbullens dag</b> — um dia nacional inteiro dedicado ao pão de canela. As pastelarias enchem-se do cheiro a canela e cardamomo." },
      semla: { title: "O bolo de creme da primavera",
        body: "Uma <b class='sv-hl'>semla</b> é um pão de cardamomo recheado com massa de amêndoa e chantilly, comido por volta de fevereiro. Os suecos comem milhões deles todos os anos." },
      surstromming: { title: "O peixe mais malcheiroso do mundo",
        body: "O <b class='sv-hl'>surströmming</b> é arenque fermentado — famoso por ser um dos alimentos mais malcheirosos do planeta! As latas abrem-se ao ar livre. Desafia as crianças a cheirá-lo (a uma distância segura)." },
      vasa: { title: "Um navio de guerra que se afundou em minutos",
        body: "O <b class='sv-hl'>Vasa</b> era um enorme navio de guerra que se afundou no porto de Estocolmo em 1628, na sua primeira viagem. Foi resgatado 333 anos depois e está quase perfeitamente conservado no <b class='sv-hl'>Vasamuseet</b>." },
      midsommar: { title: "A dançar à volta do mastro",
        body: "O <b class='sv-hl'>Midsommar</b> (solstício de verão), em junho, é uma das maiores festas da Suécia: coroas de flores, danças à volta do mastro e luz do dia sem fim — o sol quase não se põe!" }
    }
  });
})();
