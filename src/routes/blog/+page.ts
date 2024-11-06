import { base } from '$app/paths'
import type { Load } from '@sveltejs/kit'

export type BlogPost = {
  id: string
  title: string
  show: boolean
}

export const load: Load = async ({ fetch }) => {
  const response = await fetch(`${base}/api/blog/posts`)
  const posts: BlogPost[] = await response.json()
  return {
    posts
  }
}
