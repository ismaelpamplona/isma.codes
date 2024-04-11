import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import ViteYaml from '@modyfi/vite-plugin-yaml'
import path from 'path'

export default defineConfig({
  optimizeDeps: {
    include: ['js-yaml', 'json']
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, 'posts')]
    }
  },
  plugins: [sveltekit(), ViteYaml()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
})
