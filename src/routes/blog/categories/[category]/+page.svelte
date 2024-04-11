<script>
  import { base } from '$app/paths'
  export let data
  const { category, posts } = data
</script>

<svelte:head>
  <title>isma.codes - blog - category: {category}</title>
</svelte:head>

<div class="content-container">
  <h2>Category: {category}</h2>
  {#if posts.length}
    {#each posts as post}
      <article>
        <h3>
          <a href="{base}/blog/{post.slug}">{post.title}</a>
        </h3>
        Published: {post.date}
        <p>{post.description}</p>
      </article>
    {/each}
  {:else}
    <p>Not a valid category</p>
  {/if}
</div>

<style lang="scss">
  @import '../../style.scss';
  @import '../../../../style/sizes.scss';

  .content-container {
    width: $page-width;
    text-align: justify;
    max-width: 100%;

    article {
      border-bottom: 1px solid;
      padding: 0 0 20px;
    }

    article:last-child {
      border-bottom: none;
    }
  }
</style>
