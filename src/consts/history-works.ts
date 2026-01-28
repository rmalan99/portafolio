interface HistoryWork {
  titleKey: string;
  companyKey: string;
  dateRangeKey: string;
  descriptionKey: string;
  highlightsKeys?: string[];
  technologies: string[];
}

const historyWorks: HistoryWork[] = [
  {
    titleKey: "experience.items.remaxRd.title",
    companyKey: "experience.items.remaxRd.company",
    dateRangeKey: "experience.items.remaxRd.dateRange",
    descriptionKey: "experience.items.remaxRd.description",
    highlightsKeys: [
      "experience.items.remaxRd.highlights.seo",
      "experience.items.remaxRd.highlights.mobile",
      "experience.items.remaxRd.highlights.backoffice",
      "experience.items.remaxRd.highlights.ui",
      "experience.items.remaxRd.highlights.efficiency",
    ],
    technologies: [
      "React",
      "Next.js",
      "Astro",
      "JavaScript",
      "TypeScript",
      "Ionic",
      "Capacitor",
      "REST APIs",
      "Axios",
      "Fetch",
      "MUI",
      "Vite",
      "Webpack",
      "Figma",
    ],
  },
  {
    titleKey: "experience.items.banMovil.title",
    companyKey: "experience.items.banMovil.company",
    dateRangeKey: "experience.items.banMovil.dateRange",
    descriptionKey: "experience.items.banMovil.description",
    highlightsKeys: [
      "experience.items.banMovil.highlights.ux",
      "experience.items.banMovil.highlights.pwa",
      "experience.items.banMovil.highlights.kyc",
      "experience.items.banMovil.highlights.gameplay",
      "experience.items.banMovil.highlights.api",
    ],
    technologies: [
      "Vue.js 2",
      "JavaScript",
      "TypeScript",
      "Vuetify",
      "PWA",
      "Webpack",
      "REST API",
      "Figma",
    ],
  },
  {
    titleKey: "experience.items.questTravel.title",
    companyKey: "experience.items.questTravel.company",
    dateRangeKey: "experience.items.questTravel.dateRange",
    descriptionKey: "experience.items.questTravel.description",
    highlightsKeys: [
      "experience.items.questTravel.highlights.subscription",
      "experience.items.questTravel.highlights.flows",
      "experience.items.questTravel.highlights.vip",
      "experience.items.questTravel.highlights.insurance",
      "experience.items.questTravel.highlights.api",
    ],
    technologies: ["React Native", "Expo", "React", "TypeScript"],
  },
  {
    titleKey: "experience.items.deParEnPar.title",
    companyKey: "experience.items.deParEnPar.company",
    dateRangeKey: "experience.items.deParEnPar.dateRange",
    descriptionKey: "experience.items.deParEnPar.description",
    highlightsKeys: [
      "experience.items.deParEnPar.highlights.modules",
      "experience.items.deParEnPar.highlights.bugs",
      "experience.items.deParEnPar.highlights.features",
      "experience.items.deParEnPar.highlights.scrum",
      "experience.items.deParEnPar.highlights.usability",
    ],
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "Angular 8–10",
      "Ionic",
      "Material Design",
      "Scrum",
      "Testing",
      "Jest",
    ],
  },
  {
    titleKey: "experience.items.deParEnParSecondary.title",
    companyKey: "experience.items.deParEnParSecondary.company",
    dateRangeKey: "experience.items.deParEnParSecondary.dateRange",
    descriptionKey: "experience.items.deParEnParSecondary.description",
    highlightsKeys: [
      "experience.items.deParEnParSecondary.highlights.modules",
      "experience.items.deParEnParSecondary.highlights.bugs",
      "experience.items.deParEnParSecondary.highlights.features",
      "experience.items.deParEnParSecondary.highlights.scrum",
      "experience.items.deParEnParSecondary.highlights.usability",
    ],
    technologies: [
      "JavaScript",
      "HTML",
      "CSS",
      "Angular 8–10",
      "Ionic",
      "Material Design",
      "Scrum",
      "Testing",
      "Jest",
    ],
  },
];

export default historyWorks;
