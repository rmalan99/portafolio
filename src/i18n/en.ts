import type { Lang } from "./es";

const en: Lang = {
  header: {
    name: "Alan Hidalgo",
    nav: {
      start: "Home",
      about: "About me",
      projects: "Projects",
    },
    cta: "Let's talk",
  },
  home: {
    title: "Home",
    description: "Project portfolio",
    nav: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
    },
    hero: {
      greeting: "HELLO, I'M",
      nameHighlight: "ALAN HIDALGO",
      role: "FRONTEND DEVELOPER",
      primaryCta: "CONTACT ME",
    },
  },
  about: {
    title: "About",
    description: "Information about me",
    sectionTitle: "About me",
    summary:
      "Web developer specialized in building fast, modern, user-focused interfaces. Skilled in Angular, React, and frontend technologies that power high-performance products.",
    softSkills: {
      teamwork: {
        title: "Teamwork",
        description:
          "I build solutions alongside multidisciplinary teams to deliver quality products.",
      },
      adaptability: {
        title: "Adaptability",
        description:
          "I learn and adopt new technologies quickly to optimize each project.",
      },
      results: {
        title: "Outcome driven",
        description:
          "I craft functional interfaces that improve experience and create real value.",
      },
    },
    downloadCv: "Download CV",
    signature: "Alan Hidalgo",
  },
  projects: {
    title: "Projects",
    description: "My featured projects",
    badges: {
      mockup: "Mockup",
      real: "Live",
    },
    cta: "View project",
    items: {
      remaxrd: {
        name: "REMAXRD",
        description:
          "Full migration to modern tech for greater speed, better SEO, and a smoother experience.",
      },
      remaxrdMarketing: {
        name: "REMAXRD Marketing",
        description:
          "Marketing site optimized for fast load and maintainable content for campaigns.",
      },
      remaxrdInternal: {
        name: "REMAXRD Internal Suite",
        description:
          "Internal dashboard for sales teams with fast charts and straightforward navigation.",
      },
    },
  },
  contact: {
    title: "Contact",
    description: "Get in touch with me",
    sectionTitle: "Let's talk about your project",
    sectionDescription:
      "Let's build a modern, efficient, and scalable solution to grow your business.",
    stayInTouchTitle: "Stay in touch",
    contactCta: "Get in touch",
    form: {
      title: "Send me a message",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      submit: "Send",
    },
  },
  footer: {
    copyright: "Powered by Alan Hidalgo © 2025",
    ctaContact: "GET IN TOUCH",
  },
  skills: {
    title: "Technical skills",
    description:
      "Technologies and capabilities I use to build fast, modern, user-centered products.",
    groups: {
      web: {
        title: "Web development",
        description:
          "I build fast, scalable interfaces focused on user experience using modern frameworks.",
      },
      mobile: {
        title: "Mobile development",
        description:
          "I create smooth, high-performance mobile apps with hybrid tech like React Native and Ionic.",
      },
      adaptive: {
        title: "Adaptive mindset",
        description:
          "I adapt to new environments, frameworks, and challenges to deliver efficient, outcome-driven solutions.",
      },
    },
  },
  languageSelector: {
    label: "Language",
    options: {
      es: "Spanish",
      en: "English",
    },
  },
};

export default en;
