import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-static'
import sveltePreProcess from 'svelte-preprocess'

const dev = process.argv.includes('dev')

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [sveltePreProcess(), mdsvex(mdsvexConfig)],
  kit: {
    adapter: adapter({
      pages: 'public',
      assets: 'public',
      strict: false
    }),
    paths: {
      base: ''
    }
  }
}

export default config
