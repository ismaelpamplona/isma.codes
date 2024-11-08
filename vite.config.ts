import ViteYaml from '@modyfi/vite-plugin-yaml'
import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'
import { defineConfig } from 'vitest/config'

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
