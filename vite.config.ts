import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173
  },
  input: {
    main: resolve(import.meta.dirname, 'index.html'),
    site: resolve(import.meta.dirname, 'site/index.html'),
    messages: resolve(import.meta.dirname, 'messages/index.html'),
    messages_WWW: resolve(import.meta.dirname, 'WWW/messages/index.html'),
    WWW: resolve(import.meta.dirname, 'WWW/index.html'),
  },
  plugins: [react()],
})
