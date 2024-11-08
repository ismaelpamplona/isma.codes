<script lang="ts">
  import type { Holding, Wallet } from './types'

  export let data: Wallet[] = []
  let currentIndex = 0

  function sumHoldings(holdings: Holding[]): number {
    return holdings.reduce((sum, transaction) => sum + transaction.amount, 0).toFixed(2)
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % data.length
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + data.length) % data.length
  }
</script>

<div class="carousel">
  <div class="portfolio-slider">
    <button class="nav-button left" on:click={prevSlide} aria-label="Previous slide">
      <iconify-icon icon="simple-line-icons:arrow-left" />
    </button>

    <div class="wallet-card" style="transform: translateX({-currentIndex * 100}%);">
      {#each data as wallet, index}
        <div class="portfolio-summary">
          <h3>{wallet.name}</h3>
          <p class="balance">
            {wallet.meta.secondary}
            <!-- {sumHoldings(wallet.assets.flatMap((asset) => asset.holdings))} -->
          </p>
        </div>
      {/each}
    </div>

    <button class="nav-button right" on:click={nextSlide} aria-label="Next slide">
      <iconify-icon icon="simple-line-icons:arrow-right" />
    </button>
  </div>

  <div class="wallet-info">
    <div class="wallet-headers">
      <span>Coin</span>
      <span>Price</span>
      <span>Holdings</span>
    </div>

    <div class="wallet-assets">
      {#each data[currentIndex]?.assets as asset}
        <div class="wallet-asset">
          <div class="asset-info">
            <iconify-icon icon="token-branded:{asset.symbol.toLowerCase()}" />
            <span class="asset-title">{asset.symbol}</span>
            <span class="asset-name">({asset.name})</span>
          </div>
          <div class="asset-price">
            <span>$75,000</span>
            <!-- Placeholder, replace with real price data -->
          </div>
          <div class="asset-holdings">
            {#if asset.holdings.length === 0}
              <button class="add-asset">Add</button>
            {:else}
              <span class="asset-value">$400,000</span>
              <span class="asset-qtd">{sumHoldings(asset.holdings)}</span>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .carousel {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
  }

  .portfolio-slider {
    position: relative;
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 12px;
    overflow: hidden;
    margin-bottom: 1rem;

    .wallet-card {
      display: flex;
      transition: transform 0.5s ease;
      width: 100%;
    }

    .portfolio-summary {
      min-width: 100%;
      text-align: center;

      h3 {
        margin: 0;
        font-size: 1.2rem;
      }

      .balance {
        font-size: 2rem;
        font-weight: bold;
      }

      .timeframe {
        font-size: 0.8rem;
        opacity: 0.7;
      }
    }

    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      z-index: 2;
    }

    .nav-button.left {
      left: 0;
    }

    .nav-button.right {
      right: 0;
    }
  }

  .wallet-info {
    border-radius: 8px;
    padding: 1rem;

    .wallet-headers,
    .wallet-asset {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 0.5rem 0;
      font-size: 0.9rem;
      border-bottom: 1px solid #333;

      span:not(:first-child) {
        text-align: end;
      }

      button {
        text-align: center;
      }
    }

    .wallet-headers {
      font-weight: bold;
      opacity: 0.8;
    }

    .wallet-assets {
      margin-top: 0.5rem;
    }

    .wallet-asset {
      align-items: center;

      .asset-info {
        display: flex;
        align-items: center;
        gap: 5px;

        .asset-title {
          font-weight: bold;
        }
      }

      .asset-price,
      .asset-holdings {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
      }

      .add-asset {
        background: #6200ea;
        color: white;
        border: none;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        cursor: pointer;
      }
    }
  }
</style>
