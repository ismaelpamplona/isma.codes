import { json, type RequestHandler } from '@sveltejs/kit'
import { chat } from '$lib/openai/index'
import type { Message } from '$lib/openai/types'

export const POST: RequestHandler = async ({ request }) => {
  const msgs: Message[] = await request.json()
  const completion = await chat(msgs)
  return json(completion, { status: 201 })
}
