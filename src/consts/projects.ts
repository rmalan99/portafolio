export type ProjectType = "web" | "mobile" | "api";
export type ProjectCategory = "test-case" | "product/client" | "product/myself";
export type ProjectCardSize = "large" | "small";

export type ProjectMedia =
  | { kind: "image"; src: string; alt: string }
  | {
      kind: "video";
      src: string;
      poster?: string;
      posterBackground?: string;
      posterSize?: string;
      title: string;
    };

export interface ProjectCard {
  title: string;
  type: ProjectType;
  category: ProjectCategory;
  descriptionEs: string;
  descriptionEn: string;
  technologies: string[];
  githubUrl?: string;
  overviewUrl?: string;
  media: ProjectMedia;
  size: ProjectCardSize;
}

export const projectSectionCopy = {
  es: {
    eyebrow: "Trabajo seleccionado",
    title: "Proyectos destacados",
    description:
      "Productos, casos de estudio y proyectos personales donde aplico diseño de producto, desarrollo frontend y arquitectura de software.",
    filters: ["Todos", "Web", "Mobile", "API"],
    github: "GitHub",
    overview: "Ver overview",
    demo: "Ver demo",
    source: "Código fuente",
    viewAll: "Ver todos los proyectos",
    projectType: {
      web: "Web",
      mobile: "Mobile",
      api: "API",
    },
    projectCategory: {
      "test-case": "Caso de estudio",
      "product/client": "Producto cliente",
      "product/myself": "Producto propio",
    },
    mediaLabel: "Vista previa del proyecto",
    playLabel: "Reproducir video",
    closeLabel: "Cerrar",
  },
  en: {
    eyebrow: "Selected work",
    title: "Featured projects",
    description:
      "Products, case studies, and personal projects where I apply product design, frontend development, and software architecture.",
    filters: ["All", "Web", "Mobile", "API"],
    github: "GitHub",
    overview: "View overview",
    demo: "View demo",
    source: "Source code",
    viewAll: "View all projects",
    projectType: {
      web: "Web",
      mobile: "Mobile",
      api: "API",
    },
    projectCategory: {
      "test-case": "Case study",
      "product/client": "Client product",
      "product/myself": "Personal product",
    },
    mediaLabel: "Project preview",
    playLabel: "Play video",
    closeLabel: "Close",
  },
} as const;

export const PROJECTS: ProjectCard[] = [
  {
    title: "RemaxRD",
    type: "web",
    category: "product/client",
    descriptionEs:
      "Plataforma inmobiliaria moderna para búsqueda de propiedades, captación de leads y gestión comercial con una experiencia enfocada en conversión.",
    descriptionEn:
      "Modern real estate platform for property search, lead capture, and sales management with a conversion-focused experience.",
    technologies: ["Frontend", "Next.js", "MUI", "TanStack", "Redux"],
    overviewUrl: "https://remaxrd.com/",
    media: {
      kind: "image",
      src: "/images/image.png",
      alt: "RemaxRD dashboard preview",
    },
    size: "large",
  },
  {
    title: "Le Mise",
    type: "mobile",
    category: "test-case",
    descriptionEs:
      "Experiencia móvil de recetas diseñada para reducir la fricción al decidir qué cocinar, con descubrimiento por categorías, lectura guiada y modo de cocción paso a paso.",
    descriptionEn:
      "Mobile recipe experience designed to reduce friction when deciding what to cook, with category discovery, guided reading, and step-by-step cooking mode.",
    technologies: ["React", "Ionic", "Tailwind CSS", "Zustand", "TypeScript", "Vite"],
    githubUrl: "https://github.com/rmalan99/le-mise-mobile-demo",
    media: {
      kind: "video",
      src: "/videos/le-mise-real-showcase.es.mp4",
      title: "Le Mise showcase",
      poster: "https://raw.githubusercontent.com/rmalan99/le-mise-mobile-demo/main/public/app-icon.png",
      posterBackground: "linear-gradient(180deg, #f7efe4 0%, #efe2cf 100%)",
      posterSize: "260px",
    },
    size: "small",
  },
 
];

export const projectTypeStyles = {
  web: "border-[#d6c2a4] bg-[#fff8ef] text-[#9b672b]",
  mobile: "border-[#b7caf3] bg-[#f6f9ff] text-[#3568d4]",
  api: "border-[#c7d8c1] bg-[#f2faf0] text-[#3d7a49]",
} as const;

export const projectCategoryStyles = {
  "test-case": "border-[#ead3c0] bg-[#fffaf6] text-[#8f5a2f]",
  "product/client": "border-[#c8d5f3] bg-[#f6f8ff] text-[#4a62c8]",
  "product/myself": "border-[#d9c7eb] bg-[#fbf8ff] text-[#7c58a8]",
} as const;
