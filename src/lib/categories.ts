export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  {
    id: "innovator",
    name: "Student Innovator of the Year",
    icon: "💡",
    description:
      "For a student whose original invention, product or prototype solves a real Ugandan problem. Judged on originality, technical depth and potential to scale.",
  },
  {
    id: "academic",
    name: "Academic Excellence Award",
    icon: "🎓",
    description:
      "Celebrates students whose academic achievement is paired with demonstrable contribution beyond the classroom — research, mentorship or community teaching.",
  },
  {
    id: "entrepreneur",
    name: "Student Entrepreneur Award",
    icon: "📈",
    description:
      "Recognises a student running a viable enterprise — revenue-generating, employing peers, or addressing a market gap — while still in school or university.",
  },
  {
    id: "ability",
    name: "Student Ability Award — Foundation",
    icon: "🤝",
    description:
      "Honours a student living with a disability whose excellence, leadership and resilience inspire their peers and reshape what is possible in Ugandan classrooms.",
  },
  {
    id: "talented",
    name: "Talented Student Award",
    icon: "🎭",
    description:
      "For outstanding talent in sport, music, dance, fine art, theatre or creative writing — demonstrated through public performance, competition or published work.",
  },
  {
    id: "global",
    name: "Global Citizen Award",
    icon: "🌐",
    description:
      "For students whose action reflects global citizenship — cross-cultural leadership, advocacy on international issues, or partnerships beyond Uganda's borders.",
  },
  {
    id: "girls",
    name: "Girls in Action Award",
    icon: "👧🏾",
    description:
      "Celebrates a girl whose action — in STEM, leadership, advocacy or enterprise — opens doors for other girls across Uganda.",
  },
  {
    id: "media",
    name: "Media Student Award",
    icon: "🎙️",
    description:
      "Recognises a student journalist, podcaster, filmmaker or content creator whose work has informed, shaped public conversation, or amplified underrepresented voices.",
  },
  {
    id: "environment",
    name: "Environmental Stewardship Award",
    icon: "🌱",
    description:
      "For student-led work protecting Uganda's environment — climate action, reforestation, waste management, clean water, wetlands or biodiversity.",
  },
  {
    id: "leader",
    name: "Tomorrow Leaders Award",
    icon: "🌟",
    description:
      "For a student already leading peers in school government, faith, scouts, debate or community service with the integrity and vision of a future national leader.",
  },
];

export const HONORARY: Category[] = [
  {
    id: "teacher",
    name: "Teacher of the Year",
    icon: "📚",
    description:
      "Honorary certificate awarded to a teacher whose dedication, mentorship and impact have shaped Uganda's next generation of student leaders.",
  },
  {
    id: "club",
    name: "School Club of the Year",
    icon: "🏫",
    description:
      "Honorary certificate for a registered student club whose collective action over the academic year set the national standard for student-led impact.",
  },
];
