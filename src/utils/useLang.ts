import es from "../i18n/es";
import en from "../i18n/en";

const ui = {
  es,
  en,
};

export const AVAILABLE_LOCALES = Object.keys(ui);
export type AvailableLocales = keyof typeof ui;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as AvailableLocales;
  return "es";
}

const getTranslation = (lang: AvailableLocales) => {
  return ui[lang];
};

/**
 * Get nested value from object using dot notation
 * Example: getNestedValue(obj, 'home.nav.about') returns obj.home.nav.about
 */
function getNestedValue(obj: any, path: string): string {
  const keys = path.split(".");
  let result = obj;

  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return path; // Return the key itself if not found
    }
  }

  return typeof result === "string" ? result : path;
}




const useLang = (url: URL) => {
  const lang = getLangFromUrl(url);
  const translations = getTranslation(lang);

  const t = (key: string): string => {
    return getNestedValue(translations, key);
  };

  return { t, lang };
};

export default useLang;
