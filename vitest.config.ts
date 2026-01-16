import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    setupFiles: './src/tests/setup.ts',
    globalSetup: './src/tests/global-setup.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    clearMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
    typecheck: {
      tsconfig: './tsconfig.vitest.json',
    },
  },
});
