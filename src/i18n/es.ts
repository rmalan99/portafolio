const es = {
  header: {
    name: "Alan Hidalgo",
    nav: {
      start: "Inicio",
      about: "Sobre mí",
      projects: "Proyectos",
    },
    cta: "Hablemos",
  },
  home: {
    title: "Inicio",
    description: "Portafolio de proyectos",
    nav: {
      about: "Acerca de",
      projects: "Proyectos",
      contact: "Contacto",
    },
    hero: {
      greeting: "¡HOLA!, SOY",
      nameHighlight: "ALAN HIDALGO",
      role: "FRONTEND DEVELOPER",
      primaryCta: "CONTÁCTAME",
    },
  },
  about: {
    title: "Acerca de",
    description: "Información sobre mí",
    sectionTitle: "Sobre mí",
    summary:
      "Desarrollador web especializado en crear interfaces rápidas, modernas y orientadas al usuario. Domino Angular, React y tecnologías frontend que impulsan productos digitales de alto rendimiento.",
    softSkills: {
      teamwork: {
        title: "Trabajo en equipo",
        description:
          "Construyo soluciones junto a equipos multidisciplinarios para entregar productos de calidad.",
      },
      adaptability: {
        title: "Adaptabilidad al cambio",
        description:
          "Aprendo y adopto nuevas tecnologías con rapidez para optimizar cada proyecto.",
      },
      results: {
        title: "Orientación a resultados",
        description:
          "Desarrollo interfaces funcionales que mejoran la experiencia y generan valor real.",
      },
    },
    downloadCv: "Descargar CV",
    signature: "Alan Hidalgo",
  },
  projects: {
    title: "Proyectos",
    description: "Mis proyectos destacados",
    badges: {
      mockup: "Mockup",
      real: "Real",
    },
    cta: "Ver proyecto",
    items: {
      remaxrd: {
        name: "REMAXRD",
        description:
          "Migración completa a tecnologías modernas para lograr mayor velocidad, mejor SEO y una experiencia más fluida.",
      },
      remaxrdMarketing: {
        name: "REMAXRD Marketing",
        description:
          "Sitio de marketing optimizado con carga rápida y contenido mantenible para campañas.",
      },
      remaxrdInternal: {
        name: "REMAXRD Suite interna",
        description:
          "Panel interno para equipos comerciales con dashboards rápidos y navegación simple.",
      },
    },
  },
  contact: {
    title: "Contacto",
    description: "Ponte en contacto conmigo",
    sectionTitle: "Hablemos de tu proyecto",
    sectionDescription:
      "Construyamos juntos solución moderna, eficiente y escalable para impulsar tu negocio.",
    stayInTouchTitle: "Estemos en contacto",
    contactCta: "Hablemos",
    form: {
      title: "Envíame un mensaje",
      namePlaceholder: "Nombre",
      emailPlaceholder: "Email",
      messagePlaceholder: "Mensaje",
      submit: "Enviar",
    },
  },
  footer: {
    copyright: "Powered by Alan Hidalgo © 2025",
    ctaContact: "Hablemos",
  },
  skills: {
    title: "Habilidades técnicas",
    description:
      "Tecnologías y capacidades que utilizo para crear productos web rápidos, modernos y centrados en el usuario.",
    groups: {
      web: {
        title: "Desarrollo web",
        description:
          "Desarrollo interfaces rápidas, escalables y enfocadas en la experiencia del usuario usando frameworks modernos.",
      },
      mobile: {
        title: "Desarrollo móvil",
        description:
          "Creo aplicaciones móviles fluidas y de alto rendimiento con tecnologías híbridas como React Native e Ionic.",
      },
      adaptive: {
        title: "Enfoque adaptativo",
        description:
          "Me adapto a nuevos entornos, frameworks y retos para ofrecer soluciones eficientes y orientadas a resultados.",
      },
    },
  },
  languageSelector: {
    label: "Idioma",
    options: {
      es: "Español",
      en: "Inglés",
    },
  },
};

export default es;
export type Lang = typeof es;
