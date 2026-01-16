import { beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureBuild, readDistFile } from '../build';

type Locale = 'es' | 'en';

type Expectations = {
  greeting: RegExp;
  aboutTitle: RegExp;
  skillsTitle: RegExp;
  contactTitle: RegExp;
  footerCopyright: RegExp;
  footerCta: RegExp;
  footerLinks: RegExp;
  contactForm: {

    name: string;
    email: string;
    message: string;
    submit: RegExp;
    method: RegExp;
  };
  mailSubjectEncoded: string;
  cvHref: string;
};

const projectRoot = fileURLToPath(new URL('../../..', import.meta.url));

const expectations: Record<Locale, Expectations> = {
  es: {
    greeting: />\s*¡HOLA!, SOY\s*</i,
    aboutTitle: />\s*Sobre mí\s*</i,
    skillsTitle: />\s*Habilidades técnicas\s*</i,
    contactTitle: />\s*Hablemos de tu proyecto\s*</i,
    footerCopyright: />\s*Powered by Alan Hidalgo\s*©\s*2025\s*</i,
    footerCta: />\s*Hablemos\s*</i,
    footerLinks:
      /w-full h-24 bg-black[\s\S]*github\.com\/rmalan99[\s\S]*linkedin\.com\/in\/alan-hidalgo-medina\//i,
    contactForm: {
      name: 'placeholder="Nombre"',
      email: 'placeholder="Email"',
      message: 'placeholder="Mensaje"',
      submit: />\s*Enviar\s*</i,
      method: /<form[^>]*method="post"/i,
    },
    mailSubjectEncoded: 'Contacto%20desde%20portafolio',
    cvHref: '/cv/CV-ALAN-HIDALGO-ES.pdf',
  },
  en: {
    greeting: />\s*HELLO, I(?:&#39;|')M\s*</i,
    aboutTitle: />\s*About me\s*</i,
    skillsTitle: />\s*Technical skills\s*</i,
    contactTitle: />\s*Let(?:&#39;|')s talk about your project\s*</i,
    footerCopyright: />\s*Powered by Alan Hidalgo\s*©\s*2026\s*</i,
    footerCta: />\s*GET IN TOUCH\s*</i,
    footerLinks:
      /w-full h-24 bg-black[\s\S]*github\.com\/rmalan99[\s\S]*linkedin\.com\/in\/alan-hidalgo-medina\//i,
    contactForm: {
      name: 'placeholder="Name"',
      email: 'placeholder="Email"',
      message: 'placeholder="Message"',
      submit: />\s*Send\s*</i,
      method: /<form[^>]*method="post"/i,
    },
    mailSubjectEncoded: 'Contact%20from%20portfolio',
    cvHref: '/cv/CV-ALAN-HIDALGO-EN.pdf',
  },
};

const externalLinks = {
  github: 'https://github.com/rmalan99',
  linkedin: 'https://www.linkedin.com/in/alan-hidalgo-medina/',
  mailtoBase: 'mailto:rmaaron11@gmail.com',
};

describe('Page content and links per locale', () => {
  beforeAll(() => {
    ensureBuild();
  });

  (['es', 'en'] as Locale[]).forEach((locale) => {
    const expectLocale = expectations[locale];
    const htmlPath = `${locale}/index.html`;

    describe(`/${locale}`, () => {
      it('renders hero and main section titles', () => {
        const html = readDistFile(htmlPath);
        expect(html).toMatch(expectLocale.greeting);
        expect(html).toMatch(expectLocale.aboutTitle);
        expect(html).toMatch(expectLocale.skillsTitle);
        expect(html).toMatch(expectLocale.contactTitle);
        expect(html).toMatch(expectLocale.footerCopyright);
        expect(html).toMatch(expectLocale.footerCta);
        expect(html).toMatch(expectLocale.footerLinks);
      });

      it('renders contact form fields and submit', () => {
        const html = readDistFile(htmlPath);
        expect(html).toMatch(expectLocale.contactForm.method);
        expect(html).toContain(expectLocale.contactForm.name);
        expect(html).toContain(expectLocale.contactForm.email);
        expect(html).toContain(expectLocale.contactForm.message);
        expect(html).toMatch(expectLocale.contactForm.submit);
      });

      it('has external links (GitHub, LinkedIn, mailto)', () => {
        const html = readDistFile(htmlPath);
        expect(html).toContain(externalLinks.github);
        expect(html).toContain(externalLinks.linkedin);
        expect(html).toContain(`${externalLinks.mailtoBase}?subject=${expectLocale.mailSubjectEncoded}`);
      });

      it('includes a mailto link for contact', () => {
        const html = readDistFile(htmlPath);
        expect(html).toContain(`href="${externalLinks.mailtoBase}?subject=${expectLocale.mailSubjectEncoded}"`);
      });

      it('has download CV link and file exists', () => {
        const html = readDistFile(htmlPath);
        expect(html).toContain(expectLocale.cvHref);
        const cvFile = path.join(projectRoot, 'public', expectLocale.cvHref.replace(/^\//, ''));
        expect(fs.existsSync(cvFile)).toBe(true);
      });


      it('includes main anchors', () => {
        const html = readDistFile(htmlPath);
        expect(html).toContain('id="start"');
        expect(html).toContain('id="about"');
        expect(html).toContain('id="contact"');
      });
    });
  });
});
