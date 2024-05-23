import { resolve } from 'path';
import { defineConfig } from 'vite';
import * as fs from 'fs';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        search: resolve(__dirname, 'src/search/index.html'),
        shelf: resolve(__dirname, 'src/shelf/index.html'),
      },
    },
  },
  plugins: [
    {
      name: 'copy-json-to-dist',
      writeBundle() {
        const destDir = resolve(__dirname, 'dist/json');

        // Create the dist/json folder if it doesn't exist
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }

        fs.copyFileSync(
          resolve(__dirname, 'src/json/tents.json'),
          resolve(__dirname, 'dist/json/tents.json'),
        );
      },
    },
  ],
});