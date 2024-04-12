import type { Load } from '@sveltejs/kit'

interface MarkdownModule {
  default: string
  metadata: Record<string, any>
}

export const load: Load = async ({ params }) => {
  const post: MarkdownModule = await import(`../../../../posts/${params.slug}.md`)
  return {
    Content: post.default,
    ...post.metadata
  }
}
