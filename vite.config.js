import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',  // For GitHub User/Organization Pages, use '/'
  plugins: [react(), tailwindcss()],
})