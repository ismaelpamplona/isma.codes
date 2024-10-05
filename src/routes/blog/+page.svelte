<script lang="ts">
  import { base } from '$app/paths'
  import SearchInput from '$lib/SearchInput.svelte'
  import type { PostMetadata } from '../../types/posts'

  export let data: {
    posts: PostMetadata[]
  }

  let results: PostMetadata[] = data.posts
  export let searchableKeys: string[] = ['title', 'description', 'date', 'categories']
</script>

<svelte:head>
  <title>isma.codes - blog</title>
</svelte:head>

<div class="input-container">
  <SearchInput bind:data={data.posts} bind:results {searchableKeys} />
</div>
<div class="container">
  <a class="all-categories-link" href="{base}/blog/categories/">
    <iconify-icon icon="carbon:collapse-categories" />
    See all registered categories
  </a>
  {#each results as post}
    <article>
      <div class="time-categories">
        <time datetime={post.date}>{post.date}</time>
        {#if post.categories?.length}
          {#each post.categories as cat}
            <a class="category" href="{base}/blog/categories/{cat}">{cat}</a>
          {/each}
        {/if}
      </div>
      <div>
        <h3><a href="{base}/blog/{post.slug}">{post.title}</a></h3>
        <p class="description">{post.description}</p>
      </div>
    </article>
  {/each}

  {#if data.posts.length > 0 && results.length === 0}
    <span class="no-matches">no matches founded</span>
  {/if}
</div>

<style lang="scss">
  @import '../../style/sizes.scss';

  .input-container {
    width: 500px;
    max-width: 100%;
    margin: 20px auto;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;

    article {
      border-bottom: 1px solid;
      padding: 20px 0;
    }

    article:last-child {
      border: none;
    }

    article:first-child {
      padding-top: 0;
    }
  }
  .time-categories {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 5px;
    row-gap: 5px;
    line-height: 1rem;
  }

  .category {
    padding: 4px 8px;
    border: 1px solid;
    border-radius: $tag-border-radius;
  }

  h3 {
    margin-top: 0.72rem;
    margin-bottom: 0.2rem;
    font-weight: 600;

    &:hover {
      opacity: 0.7;
    }
  }

  a {
    color: inherit;
  }

  .description {
    margin-top: 1.25rem;
    line-height: 1.25rem;
  }

  .all-categories-link {
    margin: 20px 0;
  }

  p {
    text-align: justify;
  }
</style>
