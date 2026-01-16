import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));
const distDir = path.join(projectRoot, 'dist');

let buildCompleted = false;

export function ensureBuild() {
  if (buildCompleted || fs.existsSync(path.join(distDir, 'index.html'))) {
    buildCompleted = true;
    return;
  }

  execSync('npm run build', {
    cwd: projectRoot,
    stdio: 'pipe',
  });
  buildCompleted = true;
}

export function readDistFile(relativePath: string) {
  const fullPath = path.join(distDir, relativePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

export function distPath(relativePath: string) {
  return path.join(distDir, relativePath);
}
