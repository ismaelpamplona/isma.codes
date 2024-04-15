import { mdsvex } from 'mdsvex'
import mdsvexConfig from './mdsvex.config.js'
import vercel from '@sveltejs/adapter-vercel'
import sveltePreProcess from 'svelte-preprocess'

const dev = process.argv.includes('dev')

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
