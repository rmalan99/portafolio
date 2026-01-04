# Alan Hidalgo Portfolio

Personal portfolio built with Astro and TailwindCSS. It showcases featured projects, skills, and a contact form with client-side validation and reCAPTCHA v3 bot protection. The site is bilingual (ES/EN) and prioritizes performance, accessibility, and maintainability.

## Stack

- Astro 5
- TailwindCSS 4
- TypeScript

## Project structure

```text
src/
  assets/           # Icons and images
  components/       # Reusable UI
  components/pages-components/home/ # Home sections
  i18n/             # ES/EN dictionaries
  layouts/          # Layout shells
  pages/            # Astro routes
  styles/           # Global styles
  utils/            # Helpers and validations
public/             # Static assets
```

## Scripts

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Environment variables

Create a `.env` file at the project root:

```env
ASTRO_PUBLIC_RECAPTCHA_SITE_KEY=
RECAPTCHA_SECRET_KEY=
RECAPTCHA_MIN_SCORE=0.5
SITE_URL=https://www.alan-hidalgo.online
```

## Notes

- The contact form validates with Zod on client and server.
- The endpoint lives at `src/pages/api/contact.ts`.
- Translations are maintained in `src/i18n/es.ts` and `src/i18n/en.ts`.
