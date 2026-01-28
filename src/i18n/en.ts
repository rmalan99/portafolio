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
    mailSubject: "Contact from portfolio",
    form: {
      title: "Send me a message",
      namePlaceholder: "Name",
      emailPlaceholder: "Email",
      messagePlaceholder: "Message",
      submit: "Send",
      close: "Close",
      errors: {
        name: "Please enter a valid name.",
        email: "Please enter a valid email.",
        message: "Please write at least 10 characters.",
      },
      status: {
        success: "Message sent successfully.",
        error: "Message could not be sent. Try again.",
        invalid: "Check the highlighted fields.",
        recaptcha: "reCAPTCHA verification failed. Reload and try again.",
      },
    },
  },
  footer: {
    copyright: "Powered by Alan Hidalgo  © 2026",
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
  experience: {
    sectionTitle: "Career journey",
    sectionDescription: "A curated set of recent roles impacting products and teams.",
    actions: {
      showMore: "Show more",
      showLess: "Show less",
    },
    items: {
      remaxRd: {
        title: "Frontend & Mobile Developer",
        company: "Remax RD — Real Estate Platform",
        dateRange: "May 2023 - Jan 2026",
        description:
          "Real estate platform for property management, listings, and internal ops across web, mobile, and BackOffice. Contract via VersionDo.",
        highlights: {
          seo: "Migrated the main site to modern tech, improving SEO, performance, and scalability.",
          mobile:
            "Built the mobile app with Ionic and Capacitor, ensuring consistent behavior across devices.",
          backoffice:
            "Migrated and developed multiple BackOffice systems, improving workflows and maintainability.",
          ui: "Built reusable UI components and strengthened frontend architecture across web and mobile.",
          efficiency:
            "Cut build times by up to 80% and report generation time by 85%, accelerating delivery cycles.",
        },
      },
      banMovil: {
        title: "Frontend Developer",
        company: "BanMovil — Virtual Lottery Gaming Application",
        dateRange: "Mar 2025 - Jan 2026",
        description:
          "Cross-platform virtual lottery app focused on secure onboarding, account management, and real-time gameplay. Contract via VersionDo.",
        highlights: {
          ux: "Designed UIs and flows in Figma, aligning UX with product and business requirements.",
          pwa: "Developed the app with Vue.js 2 using a PWA architecture for consistent cross-platform experience.",
          kyc: "Implemented critical flows like KYC, account services, and balance request/auto-recharge.",
          gameplay:
            "Built dynamic components for lottery gameplay and real-time result visualization.",
          api: "Integrated and consumed REST APIs, collaborating with backend and QA to ensure production stability.",
        },
      },
      questTravel: {
        title: "Mobile Developer",
        company: "QuestTravel — BerryWhale",
        dateRange: "Jun 2022 - Jan 2023",
        description:
          "Cross-platform travel subscription app delivering premium perks: refunds, VIP passes, lounge access, and integrated travel insurance. Contractor via VersionDo.",
        highlights: {
          subscription:
            "Developed the app focused on subscription-based travel services.",
          flows:
            "Implemented subscription management flows including refunds and benefit access.",
          vip: "Built interfaces for VIP passes and exclusive lounge/waiting area access.",
          insurance:
            "Integrated travel insurance features, improving clarity and usability for users.",
          api: "Integrated and consumed REST APIs, ensuring secure data handling and smooth mobile interactions.",
        },
      },
      deParEnPar: {
        title: "Frontend Developer",
        company: "De Par en Par — BerryWhale / IEET",
        dateRange: "Jun 2021 - May 2023",
        description:
          "Sister web platform managing technical internships for higher-education students, supporting coordination, tracking, and institutional workflows. Contractor via VersionDo.",
        highlights: {
          modules:
            "Developed and maintained multiple frontend modules as the platform evolved.",
          bugs:
            "Fixed bugs and improved existing features to enhance stability and user experience.",
          features:
            "Integrated new functionality aligned with evolving academic and institutional requirements.",
          scrum:
            "Collaborated within Scrum cycles to keep delivery smooth and iterative.",
          usability:
            "Improved UI consistency and usability across the application’s sections.",
        },
      },
      deParEnParSecondary: {
        title: "Frontend Developer",
        company: "De Par en Par — BerryWhale / IEET",
        dateRange: "Aug 2020 - May 2022",
        description:
          "Web platform managing technical internships for secondary students, coordinating placements, tracking, and institutional processes. Contractor via VersionDo.",
        highlights: {
          modules:
            "Developed and maintained multiple frontend modules as the platform evolved.",
          bugs:
            "Fixed bugs and improved existing features to enhance stability and user experience.",
          features:
            "Integrated new functionality aligned with academic and institutional requirements.",
          scrum:
            "Collaborated within Scrum-based iterations to keep delivery smooth.",
          usability:
            "Improved UI consistency and usability across different sections of the application.",
        },
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
