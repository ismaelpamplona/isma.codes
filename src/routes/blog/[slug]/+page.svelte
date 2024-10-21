<script lang="ts">
  import { base } from '$app/paths'
  import { darkMode } from '$lib/Nav/stores'
  import mermaid from 'mermaid'
  import type { SvelteComponent } from 'svelte'
  import { onMount } from 'svelte'
  import { get, writable } from 'svelte/store'
  import type { PostMetadata } from '../../../types/posts'

  type DataType = PostMetadata & {
    Content: typeof SvelteComponent
  }

  export let data: DataType

  const { title, date, description, categories, Content } = data

  // Create a reactive store to trigger a re-render
  const rebuildKey = writable(0)

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Function to change theme for mermaid and reset diagrams
  async function changeTheme(newTheme: string) {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: newTheme,
        securityLevel: 'loose'
      })

      // Iterate over each mermaid element to reset it
      const mermaidElements = document.querySelectorAll('.mermaid')
      mermaidElements.forEach((el) => el.removeAttribute('data-processed'))

      // Delay to ensure the DOM is fully rendered before reinitializing Mermaid
      await new Promise((resolve) => requestAnimationFrame(resolve))

      await mermaid.run({
        querySelector: '.mermaid'
      })
    } catch (error) {
      console.error('Error initializing Mermaid:', error)
    }
  }

  // Function to wrap all <table> elements with a div of class "table-wrapper"
  async function wrapTablesWithDiv(): Promise<void> {
    return new Promise((resolve) => {
      const observer = new MutationObserver(() => {
        const tables = document.querySelectorAll<HTMLTableElement>('table')

        if (tables.length > 0) {
          tables.forEach((table) => {
            const wrapper = document.createElement('div')
            wrapper.classList.add('table-wrapper')

            // Insert the wrapper before the table
            table.parentNode?.insertBefore(wrapper, table)

            // Move the table inside the wrapper
            wrapper.appendChild(table)
          })

          // Disconnect the observer once the tables have been wrapped
          observer.disconnect()
          resolve()
        }
      })

      // Start observing the body for changes in the subtree
      observer.observe(document.body, { childList: true, subtree: true })
    })
  }

  onMount(() => {
    let theme = get(darkMode) ? 'dark' : 'light'
    changeTheme(theme)
    wrapTablesWithDiv()

    // Subscribe to darkMode and trigger rebuild on change
    const unsubscribe = darkMode.subscribe((isDarkMode) => {
      const newTheme = isDarkMode ? 'dark' : 'light'
      changeTheme(newTheme)

      // Trigger a full page rebuild by incrementing the rebuildKey
      rebuildKey.update((n) => n + 1)
    })

    return () => unsubscribe() // Cleanup
  })
</script>

<svelte:head>
  <title>isma.codes - blog - {title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

{#key $rebuildKey}
  <article>
    <h1>{title}</h1>
    <p class="description">{description}</p>
    <p class="published">Published at: {date}</p>
    {#if categories?.length}
      <div class="categories">
        Categories:
        {#each categories as cat}
          <a class="category" href="{base}/blog/categories/{cat}">{cat}</a>
        {/each}
      </div>
    {/if}
    <div class="content-container">
      <Content />
    </div>
    <button title="Upward" aria-label="Upward" tabIndex="0" class="to-top" on:click={scrollToTop}>
      <iconify-icon icon="eva:arrow-ios-upward-fill" />
    </button>
  </article>
{/key}

<style lang="scss">
  @import '../../../style/sizes.scss';
  @import '../style.scss';

  article {
    width: $page-width;
    max-width: 100%;
    margin-top: 20px;
  }

  .description {
    font-size: var(--step-2);
    color: var(--color-fg-description);
    margin-top: 20px;
  }

  .published {
    display: flex;
    margin-bottom: 5px;
    margin-top: 10px;
    padding-top: 0.6rem;
  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 5px;
    row-gap: 5px;
    line-height: 100%;
  }

  .category {
    padding: 4px 8px;
    border: 1px solid;
    border-radius: $tag-border-radius;
  }

  a {
    color: inherit;
  }

  .to-top {
    display: flex;
    position: fixed;
    bottom: 10px;
    right: 10px;
    padding: 5px;
    border-radius: 5px;
    font-size: 30px;
    background: rgba(0, 0, 0, 0.3);
  }
</style>
