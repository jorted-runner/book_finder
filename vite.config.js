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
  }
});
