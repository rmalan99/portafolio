import { beforeAll, describe, expect, it } from 'vitest';
import { ensureBuild, readDistFile } from '../build';

type Locale = 'es' | 'en';

const expectLocaleHtml = (html: string, locale: Locale) => {
  expect(html).toMatch(new RegExp(`<html[^>]*lang=\"${locale}\"`));
};

const expectLocaleSwitchLinks = (html: string) => {
  expect(html).toContain('class="lang-option"');
  expect(html).toContain('href="/"');
  expect(html).toContain('href="/es/"');
};

const expectSpanishCopy = (html: string) => {
  expect(html).toMatch(/>\s*Inicio\s*</);
  expect(html).toMatch(/>\s*Sobre mí\s*</);
  expect(html).toMatch(/>\s*Hablemos\s*</);
  expect(html).toMatch(/>\s*¡HOLA!, SOY\s*</);
  expect(html).toMatch(/>\s*Hablemos de tu proyecto\s*</);
  expect(html).toMatch(/>\s*Habilidades técnicas\s*</);
  expect(html).toContain('Contacto%20desde%20portafolio');
};

const expectEnglishCopy = (html: string) => {
  expect(html).toMatch(/>\s*Home\s*</);
  expect(html).toMatch(/>\s*About me\s*</);
  expect(html).toMatch(/>\s*Let(?:&#39;|')s talk\s*</);
  expect(html).toMatch(/>\s*HELLO, I(?:&#39;|')M\s*</);
  expect(html).toMatch(/>\s*Let(?:&#39;|')s talk about your project\s*</);
  expect(html).toMatch(/>\s*Technical skills\s*</);
  expect(html).toContain('Contact%20from%20portfolio');
};

describe('Language switcher', () => {
  beforeAll(() => {
    ensureBuild();
  });

  it('renders locale options on /es', () => {
    const html = readDistFile('es/index.html');
    expectLocaleHtml(html, 'es');
    expectLocaleSwitchLinks(html);
    expectSpanishCopy(html);
  });

  it('renders locale options on /en', () => {
    const html = readDistFile('en/index.html');
    expectLocaleHtml(html, 'en');
    expectLocaleSwitchLinks(html);
    expectEnglishCopy(html);
  });
});
