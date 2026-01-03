import { type AvailableLocales } from "./useLang";

const storageKey = "preferredLang";
const getPreferredLang = (): AvailableLocales | null =>
  (localStorage.getItem(storageKey) as AvailableLocales | null);
const setPreferredLang = (lang: AvailableLocales) =>
  localStorage.setItem(storageKey, lang);
const getCurrentLang = (pathname: string): AvailableLocales =>
  pathname.startsWith("/en") ? "en" : "es";


const getPathForLang = (lang: AvailableLocales): string =>
  lang === "es" ? "/" : `/${lang}`;

const useControllerLang = () => {
  const updatePreferredLang = (lang: AvailableLocales): void => {
    setPreferredLang(lang);
    const targetPath = getPathForLang(lang);
    const { search, hash } = window.location;
    window.location.href = `${targetPath}${search}${hash}`;
  };

  const evaluateLang = (): void => {
    const preferredLang = getPreferredLang();
    const lang = preferredLang || "es";
    const { pathname, search, hash } = window.location;
    const currentLang = getCurrentLang(pathname);
    const targetPath = getPathForLang(lang);
    const isDefaultLangPath = pathname === "/es" || pathname.startsWith("/es/");

    if (lang === "es" && (isDefaultLangPath || pathname !== "/")) {
      window.location.href = `${targetPath}${search}${hash}`;
      return;
    }

    if (currentLang !== lang) {
      window.location.href = `${targetPath}${search}${hash}`;
    }
  };

  return {
    updatePreferredLang,
    evaluateLang,
  };
};

export default useControllerLang;
