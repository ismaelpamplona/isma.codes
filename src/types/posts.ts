export type PostMetadata = {
  title: string
  date: string
  description: string
  categories: string[]
  slug?: string
}

export interface GlobEntryResult {
  default?: any
  metadata: PostMetadata
}

export interface Post extends PostMetadata {
  slug: string
}

export interface EnhancedPost extends Post {
  next: Post | number
  previous: Post | number
}
