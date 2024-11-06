import Fuse, { type FuseResult } from 'fuse.js'
import type { EnhancedPost, GlobEntryResult, Post } from '../types/posts'

export function fuzzySearch<T>(
  list: T[],
  pattern: string,
  keys: string[],
  threshold = 0.3
): FuseResult<T>[] {
  const all = JSON.parse(JSON.stringify(list)) as T[]
  const options = {
    includeScore: true,
    includeMatches: true,
    threshold,
    useExtendedSearch: true,
    keys: [...keys]
  }
  const fuse = new Fuse(all, options)
  return fuse.search(pattern)
}

export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  waitTime: number
): (...funcArgs: Parameters<T>) => void {
  let timer: number | null = null
  let lastExec: number | null = 0

  const throttledFunction = function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const context = this
    const execFunction = () => {
      fn.apply(context, args)
      lastExec = Date.now()
    }

    if (!lastExec) {
      execFunction()
    } else {
      clearTimeout(timer as number)
      timer = window.setTimeout(
        () => {
          if (Date.now() - (lastExec as number) >= waitTime) {
            execFunction()
          }
        },
        waitTime - (Date.now() - (lastExec as number))
      )
    }
  }

  return throttledFunction as unknown as T
}

export const fetchMarkdownPostsRaw = async (): Promise<Post[]> => {
  const allPostFiles = import.meta.glob('/posts/*.md')
  const iterablePostFiles = Object.entries(allPostFiles)
  const allPosts: Post[] = await Promise.all(
    iterablePostFiles.map(async ([filepath, globEntry]): Promise<Post> => {
      const { metadata } = (await globEntry()) as GlobEntryResult
      const slug = filepath.slice(7, -3)
      return {
        ...metadata,
        slug
      }
    })
  )

  const sortedPosts = allPosts
    .filter((post) => post.show === true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return sortedPosts
}

export const fetchMarkdownPosts = async (): Promise<EnhancedPost[]> => {
  const allRawPosts = await fetchMarkdownPostsRaw()
  return allRawPosts.map((post, index, allPosts) => ({
    ...post,
    next: allPosts[index - 1] || 0,
    previous: allPosts[index + 1] || 0
  }))
}

export const fetchCategories = async (): Promise<{
  categories: { name: string; count: number }[]
}> => {
  const allRawPosts = await fetchMarkdownPostsRaw()
  const catMap = new Map<string, number>()
  allRawPosts.forEach((post) => {
    if (post.categories) {
      post.categories.forEach((cat) => {
        catMap.set(cat, (catMap.get(cat) ?? 0) + 1)
      })
    }
  })

  const categories: { name: string; count: number }[] = Array.from(catMap, ([name, count]) => ({
    name,
    count
  }))

  return {
    categories: categories.sort((a, b) => a.name.localeCompare(b.name))
  }
}
