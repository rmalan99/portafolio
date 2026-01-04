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
  output: 'server', // Enable SSR mode
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    // Bind to 0.0.0.0 and use the same port you set in the dashboard.
    // Example: use 80 in production, 4321 for local development.
    port: process.env.NODE_ENV === 'production' ? 80 : 4321,
    host: true // Bind to 0.0.0.0 for container networking
  }
});