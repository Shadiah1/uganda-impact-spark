export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  partners: string[];
}

export const CATEGORIES: Category[] = [
  {
    id: "innovator",
    name: "Student Innovator of the Year",
    icon: "💡",
    description:
      "Awarded to a student whose original invention, product, prototype or technology solves a real Ugandan problem. Judged on originality, technical depth, evidence of working prototype, and potential to scale across communities.",
    partners: ["UNCST", "UICT", "Outbox Hub", "MoSTI", "Innovation Village"],
  },
  {
    id: "media",
    name: "Media Student Award",
    icon: "🎙️",
    description:
      "Recognises a student journalist, podcaster, filmmaker or content creator whose work has informed, shaped public conversation, or amplified underrepresented voices in Uganda.",
    partners: ["NBS TV", "NTV Uganda", "Nation Media Group", "UCC", "Next Media"],
  },
  {
    id: "academic",
    name: "Academic Excellence Award",
    icon: "🎓",
    description:
      "Celebrates students whose academic achievement is paired with demonstrable contribution beyond the classroom — research, mentorship, or community teaching.",
    partners: ["Ministry of Education and Sports", "NCDC", "UNEB", "Higher Education Council"],
  },
  {
    id: "activist",
    name: "Student Activist Award",
    icon: "✊",
    description:
      "For the student leading principled advocacy on issues that matter — human rights, climate, mental health, civic education — using lawful, peaceful and creative means.",
    partners: ["Uganda Human Rights Commission", "Open Society Foundations", "ActionAid Uganda"],
  },
  {
    id: "entrepreneur",
    name: "Student Entrepreneur Award",
    icon: "📈",
    description:
      "Recognises a student running a viable enterprise — revenue-generating, employing peers, or addressing a market gap — while still in school or university.",
    partners: ["Stanbic Bank Uganda", "Centenary Bank", "Mastercard Foundation", "Enabel"],
  },
  {
    id: "sustainability",
    name: "Sustainability Award",
    icon: "🌍",
    description:
      "For student projects measurably advancing the UN Sustainable Development Goals across resource use, circular economy, responsible production, or community resilience.",
    partners: ["UNDP Uganda", "NEMA", "GIZ Uganda", "WWF Uganda"],
  },
  {
    id: "green",
    name: "Green Earth Award",
    icon: "🌱",
    description:
      "Recognises terrestrial environmental impact — reforestation, soil regeneration, urban greening, waste management, and biodiversity protection led by students.",
    partners: ["National Forestry Authority", "Uganda Wildlife Authority", "Rotary Uganda"],
  },
  {
    id: "blue",
    name: "Blue Earth Award",
    icon: "🌊",
    description:
      "For impact on water bodies, wetlands and aquatic ecosystems — including clean water access, plastic reduction, and protection of Uganda's lakes and rivers.",
    partners: ["Ministry of Water and Environment", "NWSC", "WaterAid Uganda"],
  },
  {
    id: "ability",
    name: "Student Ability Award",
    icon: "🤝",
    description:
      "Honours a student living with a disability whose excellence, leadership and resilience inspire their peers and reshape what is possible in Ugandan classrooms.",
    partners: ["NUDIPU", "Sightsavers Uganda", "Light for the World"],
  },
  {
    id: "talented",
    name: "Talented Student Award",
    icon: "🎭",
    description:
      "For outstanding talent in sport, music, dance, fine art, theatre or creative writing — demonstrated through public performance, competition or published work.",
    partners: ["National Council of Sports", "FUFA", "Uganda National Cultural Centre", "MTN Uganda"],
  },
  {
    id: "leader",
    name: "Tomorrow's Leader Award",
    icon: "🌟",
    description:
      "For a student already leading peers in school government, faith, scouting, debate or community service with the integrity and vision of a future national leader.",
    partners: ["YALI East Africa", "U.S. Mission Uganda", "British Council", "LéO Africa Institute"],
  },
  {
    id: "girls",
    name: "Girls in Action Award",
    icon: "👧🏾",
    description:
      "Celebrates a girl whose action — in STEM, leadership, advocacy or enterprise — opens doors for other girls across Uganda.",
    partners: ["UN Women Uganda", "Girls Not Brides", "FAWE Uganda", "Plan International"],
  },
];
