<script>
  export let data
  import { base } from '$app/paths'
  let { categories } = data
</script>

<svelte:head>
  <title>isma.codes - blog - categories</title>
</svelte:head>
<div class="content-container">
  {#if categories.length}
    <h2>All categories:</h2>
    <ul>
      {#each categories as cat}
        <li><a class="category" href="{base}/blog/categories/{cat}">{cat}</a></li>
      {/each}
    </ul>
  {:else}
    <h1>No category is registered</h1>
  {/if}
</div>

<style lang="scss">
  @import '../style.scss';
</style>
