import vercel from '@sveltejs/adapter-vercel'
import { mdsvex } from 'mdsvex'
import sveltePreProcess from 'svelte-preprocess'
import mdsvexConfig from './mdsvex.config.js'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.svx', '.md'],
  preprocess: [sveltePreProcess(), mdsvex(mdsvexConfig)],
  kit: {
    adapter: vercel(),
    paths: {
      base: ''
    }
  }
}

export default config
