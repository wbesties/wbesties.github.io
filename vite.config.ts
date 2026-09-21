import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  input: {
    main: resolve(import.meta.dirname, 'index.html'),
    luominai: resolve(import.meta.dirname, 'luominai/index.html'),
  },
  plugins: [react()],
})
