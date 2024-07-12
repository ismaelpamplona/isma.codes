import OpenAI from 'openai'
import { OPENAI_API_KEY } from '$env/static/private'
import instructions from '../../data/assistant-instructions.yml'
import links from '../../data/links.yml'
import data from '../../data/personal.yml'

type ChatCompletion = {
  id: string
  object: string
  created: number
  model: string
  choices: Array<{
    index: number
    message: Message
    logprobs: {
      content: Array<{
        token: string
        logprob: number
        bytes: number[] | null
        top_logprobs: Array<{
          token: string
          logprob: number
          bytes: number[] | null
        }>
      }>
    }
    finish_reason: string
  }>
  usage: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
  system_fingerprint: string | null | undefined
}

type Message = {
  role: 'user' | 'system' | 'assistant'
  content: string
}

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
