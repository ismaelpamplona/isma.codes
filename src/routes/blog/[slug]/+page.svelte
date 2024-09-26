<script lang="ts">
  import { base } from '$app/paths'
  import { darkMode } from '$lib/Nav/stores'
  import mermaid from 'mermaid'
  import { onMount, type SvelteComponent } from 'svelte'
  import type { PostMetadata } from '../../../types/posts'

  type DataType = PostMetadata & {
    Content: typeof SvelteComponent
  }

  export let data: DataType

  const { title, date, description, categories, Content } = data

  onMount(async () => {
    let theme = $darkMode ? 'dark' : 'light'
    changeTheme(theme)
    const tables = document.querySelectorAll<HTMLTableElement>('table')
    tables.forEach((table) => {
      const wrapper = document.createElement('div')
      wrapper.className = 'table-wrapper'

      table.parentNode?.insertBefore(wrapper, table)
      wrapper.appendChild(table)
    })
  })

  async function changeTheme(newTheme: string) {
    mermaid.initialize({
      startOnLoad: false,
      theme: newTheme,
      securityLevel: 'loose' // Add this line
    })
    await mermaid.run({
      querySelector: '.mermaid'
    })
  }

  $: $darkMode ? changeTheme('dark') : changeTheme('light')

  $: {
    changeTheme($darkMode ? 'dark' : 'light')
    // Trigger re-rendering of all Mermaid diagrams
    mermaid.init(undefined, document.querySelectorAll('.mermaid'))
  }
</script>

<svelte:head>
  <title>isma.codes - blog - {title}</title>
  <meta property="og:title" content={title} />
</svelte:head>

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
