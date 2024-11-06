<script lang="ts">
  export let data
  import { base } from '$app/paths'
  import SearchInput from '$lib/UIComponents/SearchInput.svelte'

  let { categories } = data

  type Category = {
    name: string
    count: number
  }

  let results: Category[] = data.categories

  let searchableKeys: string[] = ['name']
</script>

<svelte:head>
  <title>isma.codes - blog - categories</title>
</svelte:head>
<div class="content-container">
  <div class="input-container">
    <SearchInput bind:data={data.categories} bind:results {searchableKeys} />
  </div>
  {#if categories.length}
    <ul>
      {#each results as cat}
        <li>
          <a class="category" href="{base}/blog/categories/{cat.name}">
            {cat.name}
            <div>{cat.count}</div>
          </a>
        </li>
      {/each}
    </ul>
  {:else}
    <h1>No category is registered</h1>
  {/if}
</div>

<style lang="scss">
  @import '../style.scss';
  @import '../../../style/sizes.scss';

  .input-container {
    width: 500px;
    max-width: 100%;
    margin: 20px auto;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    margin: 0;
    list-style: none;
    gap: 10px;
  }

  li {
    border: 1px solid;
    border-radius: $tag-border-radius;
    text-align: center;
    transition: all 0.3s ease;
    margin: 0 !important;
    flex-grow: 1;

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      padding: 15px 10px;

      div {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px 6px;
        border: 1px solid;
        border-radius: 50%;
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  li:hover {
    transform: translateY(-3px);
  }
</style>
