/* course.js — the learning path: units → modules → lessons.
   Order here defines unlock order. Colors drive the unit banners & nodes. */
(function () {
  "use strict";
  LSV.data.course = {
    title: "Svenska för Stockholm",
    subtitle: "Swedish for our family trip",
    units: [
      { id: "u1", title: "Survival basics", kicker: "Unit 1", icon: "👋", color: "#58cc02", colorDark: "#4aa802",
        modules: [
          { id: "m1", title: "Greetings", lessons: ["l01", "l02"] },
          { id: "m2", title: "Being polite", lessons: ["l03", "l04"] }
        ] },
      { id: "u2", title: "Meeting people", kicker: "Unit 2", icon: "🧑‍🤝‍🧑", color: "#1cb0f6", colorDark: "#1899d6",
        modules: [
          { id: "m3", title: "You & me", lessons: ["l05", "l06"] },
          { id: "m4", title: "Small talk", lessons: ["l07"] }
        ] },
      { id: "u3", title: "Numbers & shopping", kicker: "Unit 3", icon: "🔢", color: "#ce82ff", colorDark: "#a568cc",
        modules: [
          { id: "m5", title: "Counting", lessons: ["l08", "l09"] },
          { id: "m6", title: "At the shop", lessons: ["l10", "l11"] }
        ] },
      { id: "u4", title: "Food & fika", kicker: "Unit 4", icon: "☕", color: "#ff9600", colorDark: "#e08400",
        modules: [
          { id: "m7", title: "Fika", lessons: ["l12", "l13"] },
          { id: "m8", title: "Meals", lessons: ["l14"] }
        ] },
      { id: "u5", title: "Getting around", kicker: "Unit 5", icon: "🚇", color: "#ff4b4b", colorDark: "#e63f3f",
        modules: [
          { id: "m9", title: "Transport & directions", lessons: ["l15", "l16"] }
        ] },
      { id: "u6", title: "Sightseeing", kicker: "Unit 6", icon: "🏰", color: "#00b4a0", colorDark: "#009486",
        modules: [
          { id: "m10", title: "Around Stockholm", lessons: ["l17", "l18"] }
        ] }
    ]
  };
})();
