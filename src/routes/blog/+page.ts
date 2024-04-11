import type { Load } from '@sveltejs/kit'
import { base } from '$app/paths'

export type BlogPost = {
  id: string
  title: string
}

export const load: Load = async ({ fetch }) => {
  const response = await fetch(`${base}/api/blog/posts`)
  const posts: BlogPost[] = await response.json()
  return {
    posts
  }
}
