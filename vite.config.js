import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  base: '/my-portfolio/',  // or your subdirectory if deploying to GitHub Pages
  plugins: [react(), tailwindcss()],
})