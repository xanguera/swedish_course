/* culture_ca.js — "Sabies que?" (Did you know?) cards for the Catalan course.
   Shown at the end of lessons and in the Culture tab.
   Each: id, emoji, title, l2 (the highlighted Catalan keyword), body (HTML allowed).
   Registered under the "ca" target. Titles/bodies are English (source). */
(function () {
  "use strict";
  var C = [
    { id: "dos_petons", emoji: "😙", title: "Two kisses hello", l2: "dos petons",
      body: "Catalans often greet friends with <b class='sv-hl'>dos petons</b> — a kiss on each cheek, starting on your left. Men usually shake hands or hug, but a warm <b class='sv-hl'>hola</b> is always enough for a visitor." },

    { id: "dues_llengues", emoji: "🗣️", title: "Catalan is its own language", l2: "català",
      body: "<b class='sv-hl'>Català</b> is not a dialect of Spanish — it's a separate Romance language spoken by millions, co-official in Catalonia. Everyone in Barcelona also speaks Spanish, but trying a little Catalan delights the locals." },

    { id: "sant_jordi", emoji: "🌹", title: "Roses and books", l2: "Sant Jordi",
      body: "On 23 April, <b class='sv-hl'>Sant Jordi</b> (St George) fills the streets with rose and book stalls. Sweethearts swap a rose and a book — it's Catalonia's romantic answer to Valentine's Day, tied to the legend of the knight and the dragon." },

    { id: "caga_tio", emoji: "🪵", title: "The log that brings presents", l2: "Caga Tió",
      body: "At Christmas, kids 'feed' a little smiling log called the <b class='sv-hl'>Caga Tió</b> for days, then beat it with sticks so it 'delivers' sweets and small gifts. It's one of Catalonia's most beloved (and funniest) traditions." },

    { id: "sant_joan", emoji: "🔥", title: "Bonfires on the shortest night", l2: "Sant Joan",
      body: "The night of 23 June, <b class='sv-hl'>Sant Joan</b> lights up beaches and squares with bonfires, firecrackers and <b class='sv-hl'>coca</b> cake — just like the Portuguese <i>São João</i>. Barcelona barely sleeps that night." },

    { id: "vermut", emoji: "🍹", title: "Let's do the vermouth", l2: "fer el vermut",
      body: "On weekends, locals <b class='sv-hl'>fer el vermut</b> — a pre-lunch <b class='sv-hl'>vermut</b> (vermouth) with olives and crisps, standing at the bar. It's less about the drink than the ritual of meeting up." },

    { id: "pa_amb_tomaquet", emoji: "🍅", title: "The everyday Catalan bread", l2: "pa amb tomàquet",
      body: "<b class='sv-hl'>Pa amb tomàquet</b> is bread rubbed with ripe tomato, olive oil and a pinch of salt. It comes with almost everything, and Catalans grow up eating it daily — simple and perfect." },

    { id: "calcots", emoji: "🧅", title: "Grilled onions with a bib", l2: "calçots",
      body: "In winter, a <b class='sv-hl'>calçotada</b> means charred spring onions (<b class='sv-hl'>calçots</b>) dipped in romesco sauce. You wear a bib, use your hands, and it gets gloriously messy — a proper Catalan feast." },

    { id: "castellers", emoji: "🧗", title: "Human towers", l2: "castellers",
      body: "Teams called <b class='sv-hl'>castellers</b> build human towers up to ten people high, topped by a small child. Recognised by UNESCO, a <b class='sv-hl'>castell</b> is teamwork, courage and balance made visible." },

    { id: "gaudi", emoji: "🏛️", title: "Gaudí shaped the city", l2: "modernisme",
      body: "Antoni Gaudí's <b class='sv-hl'>modernisme</b> gave Barcelona the <b class='sv-hl'>Sagrada Família</b>, Park Güell and Casa Batlló. The Sagrada Família was begun in 1882 and is still being finished today." },

    { id: "fc_barca", emoji: "⚽", title: "More than a club", l2: "més que un club",
      body: "FC Barcelona's motto is <b class='sv-hl'>més que un club</b> — 'more than a club'. For many Catalans the team is a symbol of the region's identity, not just football. Camp Nou is a pilgrimage for fans." },

    { id: "la_merce", emoji: "🎆", title: "The city's big party", l2: "La Mercè",
      body: "Around 24 September, <b class='sv-hl'>La Mercè</b> is Barcelona's biggest festival: castellers, giants (<b class='sv-hl'>gegants</b>), and the <b class='sv-hl'>correfoc</b> — a 'fire run' of drummers and devils with fireworks." }
  ];

  LSV.data.registerCourse("ca", { culture: C });
})();
