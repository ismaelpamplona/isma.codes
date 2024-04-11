import OpenAI from 'openai'
import type { ChatCompletion, Message } from './types'
import { OPENAI_API_KEY } from '$env/static/private'
import instructions from '../../data/assistant-instructions.yml'
import links from '../../data/links.yml'
import data from '../../data/personal.yml'

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY
})

const messages: Message[] = [
  {
    role: 'system',
    content: `
      # Instructions: 
      \n ${JSON.stringify(instructions)} 
      # Ismael's personal data:
      \n ${JSON.stringify(data)}
      This webpage links:
      \n ${JSON.stringify(links)}
      `
  },
  {
    role: 'user',
    content: 'Hello!'
  }
]

export async function greeting(): Promise<ChatCompletion> {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages
  })
  return response as ChatCompletion
}

export async function chat(msgs: Message[]): Promise<ChatCompletion> {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [...messages, ...msgs]
  })
  return response as ChatCompletion
}
