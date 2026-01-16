import { beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import { distPath, ensureBuild, readDistFile } from '../build';

const locales = ['es', 'en'] as const;

describe('Localized home pages', () => {
  beforeAll(() => {
    ensureBuild();
  });

  locales.forEach((locale) => {
    it(`builds /${locale}`, () => {
      const relative = `${locale}/index.html`;
      const htmlPath = distPath(relative);
      expect(fs.existsSync(htmlPath)).toBe(true);

      const html = readDistFile(relative);
      expect(html.length).toBeGreaterThan(0);
    });
  });
});
