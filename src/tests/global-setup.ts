import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const projectRoot = fileURLToPath(new URL('../..', import.meta.url));

export default async function globalSetup() {
  execSync('npm run build', {
    cwd: projectRoot,
    stdio: 'pipe',
  });
}
