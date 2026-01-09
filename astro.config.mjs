// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const envSite = process.env.SITE_URL ?? '';

const resolvedSite = (() => {
  if (!envSite || !/^https?:\/\//.test(envSite)) return undefined;
  try {
    const url = new URL(envSite);
    return url.toString().replace(/\/$/, '');
  } catch {
    return undefined;
  }
})();

// https://astro.build/config
export default defineConfig({
  site: resolvedSite,
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },

  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    },
  },

});
