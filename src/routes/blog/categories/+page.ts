import { base } from '$app/paths'

export const load = async ({ fetch }) => {
  const response = await fetch(`${base}/api/blog/categories`)
  const categories = await response.json()
  return categories
}
