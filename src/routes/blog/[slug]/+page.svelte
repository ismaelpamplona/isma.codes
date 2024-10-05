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

  onMount(() => {
    let theme = get(darkMode) ? 'dark' : 'light'
    changeTheme(theme)

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
</style>
