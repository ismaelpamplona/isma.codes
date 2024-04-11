// Import types from @sveltejs/kit for request and response handling
import type { RequestHandler } from '@sveltejs/kit'
import { fetchCategories } from '../../../../helpers/utils'
import { json } from '@sveltejs/kit'

export const GET: RequestHandler = async () => {
  const allCategories = await fetchCategories()
  return json(allCategories)
}
