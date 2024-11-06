<script lang="ts">
  import type { CoinListObject } from '$lib/binance/index'
  import { getTickersFullData } from '$lib/binance/index'
  import SearchInput from '$lib/UIComponents/SearchInput.svelte'
  import { onMount } from 'svelte'

  let sortedData: {
    symbol: string
    name: string
    rank: number
  }[] = []

  onMount(async () => {
    const objectData: CoinListObject = await getTickersFullData()

    sortedData = Object.entries(objectData)
      .map(([symbol, { name, rank }]) => ({ symbol, name, rank }))
      .sort((a, b) => a.name.localeCompare(b.name))
  })
</script>

<div class="select-coin">
  <div class="search-container">
    <SearchInput />
  </div>

  {#each sortedData as ticker}
    <div class="ticker-container">
      <div class="ticker-info">
        <h2 class="icon"><iconify-icon icon="token-branded:{ticker.symbol.toLowerCase()}" /></h2>
        <h4 class="symbol">{ticker.symbol}</h4>
        <span class="name">{ticker.name}</span>
      </div>
      <div class="rank">#{ticker.rank}</div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import './index.scss';
</style>
