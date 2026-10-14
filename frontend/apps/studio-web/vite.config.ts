import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/sprint-story/studio/' : '/',
  plugins: [react()],
  build: { outDir: '../../../dist/studio', emptyOutDir: false },
});
