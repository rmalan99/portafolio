// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  // Update this with your actual domain
  // site: 'https://alanhidalgo.dev',

  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    locales: ["es", "en"],
    defaultLocale: "es",
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: true,
    }

  },
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: process.env.NODE_ENV === 'production' ? (Number(process.env.PORT) || 80) : 4321,
    host: true
  }
});