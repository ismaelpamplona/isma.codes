<script lang="ts">
  import { onMount, type SvelteComponent } from 'svelte'
  import { base } from '$app/paths'
  import type { PostMetadata } from '../../../types/posts'
  import mermaid from 'mermaid'
  import { darkMode } from '$lib/Nav/stores'

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
      theme: newTheme
    })
    await mermaid.run({
      querySelector: '.mermaid'
    })
  }

  $: $darkMode ? changeTheme('dark') : changeTheme('light')
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
      <p>Categories:</p>
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
    column-gap: 1rem;
    align-items: center;
    line-height: 1rem;
    padding-bottom: 0.6rem;
  }

  .category {
    padding: 4px 8px;
    border-radius: $tag-border-radius;
    border: solid 1px;
  }

  a {
    color: inherit;
  }
</style>
