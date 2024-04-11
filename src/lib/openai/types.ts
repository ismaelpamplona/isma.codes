export type ChatCompletion = {
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
  
export type Message = {
    role: 'user' | 'system' | 'assistant'
    content: string
}
  