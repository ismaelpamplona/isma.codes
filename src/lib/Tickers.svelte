<script lang="ts">
  import type { CryptoPairs } from '$lib/binance/index'
  import { initializePrices, prices } from '$lib/binance/index'
  import { onDestroy, onMount } from 'svelte'
  import data from '../data/pairs-crypto.yml'
  import { formatNumber } from '../helpers/utils'

  export const cryptoPairs = data as CryptoPairs[]

  cryptoPairs.forEach((pair) =>
    prices.update((n) => ({ ...n, [pair.pair]: { value: '...', direction: '' } }))
  )

  let cleanUpFunction: () => void

  onMount(() => (cleanUpFunction = initializePrices(cryptoPairs)))

  onDestroy(() => cleanUpFunction && cleanUpFunction())
</script>

<div class="tickers-container">
  <div class="ticker">
    {#each cryptoPairs as p}
      <div class="crypto-pair">
        <strong>{p.name}:</strong>
        <span class:loading={$prices[p.pair].value === '...'}
          >{p.prefix}{formatNumber($prices[p.pair].value)}
          {#if $prices[p.pair].direction === 'up'}
            <i class="up-arrow"></i>
          {:else if $prices[p.pair].direction === 'down'}
            <i class="down-arrow"></i>
          {/if}
        </span>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .tickers-container {
    width: 100%;
    overflow: hidden;
  }

  .ticker {
    display: flex;
    flex-wrap: nowrap;
    white-space: nowrap;
    animation: moveLeft 30s linear infinite;
    background-color: inherit;
    font-size: 12px;
    gap: 40px;
  }

  @keyframes moveLeft {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .crypto-pair {
    display: flex;
    align-items: center;
    gap: 3px;
    span {
      border-radius: 5px;
      transition: background-color 0.3s ease;
      position: relative;

      &.loading {
        animation: blink-animation 1.5s infinite;
      }
    }
  }

  @keyframes blink-animation {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
    100% {
      opacity: 1;
    }
  }

  .up-arrow,
  .down-arrow {
    display: inline-block;
    width: 0;
    height: 0;
    border-style: solid;
  }

  .up-arrow {
    border-width: 0 5px 8px 5px;
    border-color: transparent transparent #00ff00 transparent;
  }

  .down-arrow {
    border-width: 8px 5px 0 5px;
    border-color: #ff0000 transparent transparent transparent;
  }
</style>
