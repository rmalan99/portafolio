// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1];
const githubBase = repoName ? `/${repoName}` : undefined;
const githubSite = process.env.GITHUB_REPOSITORY
  ? `https://${process.env.GITHUB_REPOSITORY.split('/')?.[0]}.github.io${githubBase ?? ''}`
  : undefined;

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? githubSite ?? 'https://www.alan-hidalgo.online',
  base: githubBase,
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
