import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const dev = process.argv.includes('dev')

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [vitePreprocess()],
  kit: {
    adapter: adapter()
  },
  paths: {
    base: dev ? '' : 'isma.codes'
  }
}

export default config
