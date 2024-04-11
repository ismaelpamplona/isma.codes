import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'
import ViteYaml from '@modyfi/vite-plugin-yaml'

export default defineConfig({
  optimizeDeps: {
    include: ['js-yaml', 'json']
  },
  plugins: [sveltekit(), ViteYaml()],
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  }
})
