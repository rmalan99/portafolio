import { beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import { distPath, ensureBuild, readDistFile } from '../build';

describe('Home page /', () => {
  beforeAll(() => {
    ensureBuild();
  });

  it('builds index.html without errors', () => {
    const htmlPath = distPath('index.html');
    expect(fs.existsSync(htmlPath)).toBe(true);

    const html = readDistFile('index.html');
    expect(html.length).toBeGreaterThan(0);
  });
});
