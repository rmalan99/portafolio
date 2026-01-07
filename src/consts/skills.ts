import HtmlIcon from "@assets/icons/tecnologys/html.svg";
import JavaScriptIcon from "@assets/icons/tecnologys/javascript.svg";
import AngularIcon from "@assets/icons/tecnologys/angular.svg";
import ReactIcon from "@assets/icons/tecnologys/react.svg";
import TypeScriptIcon from "@assets/icons/tecnologys/typescript.svg";
import NodejsIcon from "@assets/icons/tecnologys/nodejs.svg";
import VuejsIcon from "@assets/icons/tecnologys/vuejs.svg";
import IonicIcon from "@assets/icons/tecnologys/ionic.svg";
import CapacitorIcon from "@assets/icons/tecnologys/capacitor.svg";
import ReactNativeIcon from "@assets/icons/tecnologys/reactnative.svg";
import GitIcon from "@assets/icons/tecnologys/git.svg";
import FigmaIcon from "@assets/icons/tecnologys/figma.svg";
import AstroIcon from "@assets/icons/tecnologys/astro.svg";
import TailwindcssIcon from "@assets/icons/tecnologys/tailwind.svg";
import NextjsIcon from "@assets/icons/tecnologys/nextjs.svg";
import Mobile from "@assets/icons/mobile.svg";
import Desktop from "@assets/icons/desktop.svg";
import Sword from "@assets/icons/sword.svg";
import Stats from "@assets/icons/stats.svg";
import Work from "@assets/icons/work.svg";

interface SkillGroup {
  icon: any;
  titleKey: string;
  descriptionKey: string;
}
interface Skill {
  icon: any;
  title: string;
}

const hardSkills: Skill[] = [
  {
    icon: ReactIcon,
    title: "React",
  },
  {
    icon: AngularIcon,
    title: "Angular",
  },
  {
    icon: VuejsIcon,
    title: "Vue.js",
  },
  {
    icon: JavaScriptIcon,
    title: "JavaScript",
  },
  {
    icon: TypeScriptIcon,
    title: "TypeScript",
  },
  {
    icon: HtmlIcon,
    title: "HTML",
  },
  {
    icon: NodejsIcon,
    title: "Node.js",
  },
  {
    icon: IonicIcon,
    title: "Ionic",
  },
  {
    icon: CapacitorIcon,
    title: "Capacitor",
  },

  {
    icon: GitIcon,
    title: "Git",
  },
  {
    icon: FigmaIcon,
    title: "Figma",
  },
  {
    icon: AstroIcon,
    title: "Astro",
  },
  {
    icon: TailwindcssIcon,
    title: "Tailwind CSS",
  },
  {
    icon: NextjsIcon,
    title: "Next.js",
  },
  {
    icon: ReactNativeIcon,
    title: "React Native",
  },
];



const hardSkillsGroup: SkillGroup[] = [
  {
    icon: Desktop,
    titleKey: "skills.groups.web.title",
    descriptionKey: "skills.groups.web.description",
  },
  {
    icon: Mobile,
    titleKey: "skills.groups.mobile.title",
    descriptionKey: "skills.groups.mobile.description",
  },
  {
    icon: Sword,
    titleKey: "skills.groups.adaptive.title",
    descriptionKey: "skills.groups.adaptive.description",
  },
];



const softSkills: SkillGroup[] = [
  {
    icon: Work,
    titleKey: "about.softSkills.teamwork.title",
    descriptionKey: "about.softSkills.teamwork.description",
  },
  {
    icon: Stats,
    titleKey: "about.softSkills.adaptability.title",
    descriptionKey: "about.softSkills.adaptability.description",
  },
  {
    icon: Sword,
    titleKey: "about.softSkills.results.title",
    descriptionKey: "about.softSkills.results.description",
  },
];
export { hardSkills, hardSkillsGroup, softSkills };
