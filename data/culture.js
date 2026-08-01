/* culture.js — "Visste du?" (Did you know?) cards.
   Shown at the end of lessons and in the Culture tab.
   Each: id, emoji, title, l2 (the highlighted target keyword), body (HTML allowed). */
(function () {
  "use strict";
  var C = [
    { id: "fika", emoji: "☕", title: "Fika is sacred", l2: "fika",
      body: "<b class='sv-hl'>Fika</b> is the Swedish ritual of pausing for coffee and something sweet — usually a <b class='sv-hl'>kanelbulle</b> (cinnamon bun). It's both a noun and a verb: you can <i>fika</i> with friends. Workplaces stop for it daily. Never skip fika!" },

    { id: "lagom", emoji: "⚖️", title: "Lagom — not too much, not too little", l2: "lagom",
      body: "<b class='sv-hl'>Lagom</b> means 'just the right amount'. There's no exact English word for it. It captures the whole Swedish idea of balance and moderation — in coffee, in work, in life." },

    { id: "pippi", emoji: "🧒", title: "Pippi Longstocking is Swedish", l2: "Pippi Långstrump",
      body: "The super-strong, red-haired girl <b class='sv-hl'>Pippi Långstrump</b> was created by Swedish author Astrid Lindgren. You can meet her at <b class='sv-hl'>Junibacken</b>, a storybook museum on Djurgården — perfect for kids!" },

    { id: "pant", emoji: "♻️", title: "Get money back for bottles", l2: "pant",
      body: "When you buy a drink, you pay a small deposit called <b class='sv-hl'>pant</b>. Return the empty can or bottle to a machine (a <b class='sv-hl'>pantmaskin</b>) in any supermarket and get your kronor back. Kids love doing this!" },

    { id: "cashless", emoji: "💳", title: "Sweden is almost cashless", l2: "kort",
      body: "You can pay by <b class='sv-hl'>kort</b> (card) or phone almost everywhere — even for a single bun. Many places don't take cash at all, so you rarely need <b class='sv-hl'>kronor</b> in your pocket." },

    { id: "tbana_art", emoji: "🎨", title: "The world's longest art gallery", l2: "tunnelbana",
      body: "Stockholm's <b class='sv-hl'>tunnelbana</b> (metro) is famous for its stations carved and painted like caves and galleries. T-Centralen and Solna are stunning — ride around just to look up!" },

    { id: "allemansratten", emoji: "🌲", title: "The right to roam", l2: "allemansrätten",
      body: "<b class='sv-hl'>Allemansrätten</b> — the 'everyman's right' — lets everyone walk, swim and pick berries in nature, even on private land, as long as you're respectful. Sweden loves the outdoors." },

    { id: "kanelbullens_dag", emoji: "🥐", title: "Cinnamon Bun Day", l2: "Kanelbullens dag",
      body: "October 4th is <b class='sv-hl'>Kanelbullens dag</b> — a whole national day for the cinnamon bun. Bakeries fill up with the smell of cinnamon and cardamom." },

    { id: "semla", emoji: "🧁", title: "The cream bun of spring", l2: "semla",
      body: "A <b class='sv-hl'>semla</b> is a cardamom bun stuffed with almond paste and whipped cream, eaten around February. Swedes eat millions of them every year." },

    { id: "surstromming", emoji: "🐟", title: "The world's smelliest fish", l2: "surströmming",
      body: "<b class='sv-hl'>Surströmming</b> is fermented herring — famous as one of the smelliest foods on Earth! Cans are opened outdoors. Dare the kids to sniff it (from a safe distance)." },

    { id: "vasa", emoji: "🚢", title: "A warship that sank in minutes", l2: "Vasamuseet",
      body: "The <b class='sv-hl'>Vasa</b> was a giant warship that sank in Stockholm harbour in 1628 on its very first voyage. It was raised 333 years later and is almost perfectly preserved at the <b class='sv-hl'>Vasamuseet</b>." },

    { id: "midsommar", emoji: "🌸", title: "Dancing around the pole", l2: "midsommar",
      body: "<b class='sv-hl'>Midsommar</b> (Midsummer) in June is one of Sweden's biggest celebrations: flower crowns, dancing around a maypole, and endless daylight — the sun barely sets!" }
  ];

  LSV.data.registerCourse("sv", { culture: C });
})();
