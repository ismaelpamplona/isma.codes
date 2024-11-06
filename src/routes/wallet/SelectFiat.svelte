<script lang="ts">
  let sortedData: {
    symbol: string
    name: string
  }[] = [
    {
      symbol: 'USD',
      name: 'US Dollar'
    },
    {
      symbol: 'BRL',
      name: 'Brazilian Real'
    },
    {
      symbol: 'EUR',
      name: 'Euro'
    }
  ]
</script>

<div class="select-coin">
  {#each sortedData as ticker}
    <div class="ticker-container">
      <div class="ticker-info">
        <h2 class="icon"><iconify-icon icon="mdi:currency-{ticker.symbol.toLowerCase()}" /></h2>
        <h4 class="symbol">{ticker.symbol}</h4>
        <span class="name">{ticker.name}</span>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import './index.scss';
</style>
