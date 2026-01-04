// Custom types declarations
declare var myString: string;
declare function myFunction(): boolean;

interface ImportMetaEnv {
  readonly ASTRO_PUBLIC_RECAPTCHA_SITE_KEY: string;
  readonly RECAPTCHA_SECRET_KEY: string;
  readonly RECAPTCHA_MIN_SCORE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Astro types, not necessary if you already have a `tsconfig.json`
/// <reference path="../.astro/types.d.ts" />
