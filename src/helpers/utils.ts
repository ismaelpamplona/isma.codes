import Fuse, { type FuseResult } from 'fuse.js'

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
