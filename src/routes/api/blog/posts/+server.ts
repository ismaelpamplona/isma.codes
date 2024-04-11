// Import the type definitions for request handlers from @sveltejs/kit
import type { RequestHandler } from '@sveltejs/kit'
import { fetchMarkdownPosts } from '../../../../helpers/utils'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  const allPosts = await fetchMarkdownPosts()
  return json(allPosts)
}
