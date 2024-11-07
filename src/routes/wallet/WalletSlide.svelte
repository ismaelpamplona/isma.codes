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
  <button class="nav-button left" on:click={prevSlide} aria-label="Previous slide">
    <iconify-icon icon="simple-line-icons:arrow-left" />
  </button>

  <div class="slides-container">
    {#each data as wallet, index}
      <div
        class="slide"
        class:selected={index === currentIndex}
        style="transform: translateX({-currentIndex * 100}%);"
      >
        <div class="wallet-container">
          <h5 class="wallet-title">{wallet.name}</h5>
          <div class="wallet-assets">
            <div class="wallet-asset title">
              <span>Coin</span>
              <span>Price</span>
              <span>Holdings</span>
            </div>
            {#each wallet.assets as asset}
              <div class="wallet-asset">
                <div class="asset-info">
                  <h5><iconify-icon icon="token-branded:{asset.symbol.toLowerCase()}" /></h5>
                  <span class="asset-title">{asset.symbol}</span>
                  <span class="asset-name">({asset.name})</span>
                </div>
                <div class="asset-price">
                  <span>$75.000</span>
                </div>
                <div class="asset-holdings">
                  {#if !asset.holdings.length}
                    <button class="add-asset">add</button>
                  {:else}
                    <span class="asset-value">$400.000</span>
                    <span class="asset-qtd">{sumHoldings(asset.holdings)}</span>
                  {/if}
                </div>
              </div>
            {/each}
          </div>
        </div>
      </div>
    {/each}
  </div>

  <button class="nav-button right" on:click={nextSlide} aria-label="Next slide">
    <iconify-icon icon="simple-line-icons:arrow-right" />
  </button>
</div>

<style lang="scss">
  .carousel {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    width: 100%;
    max-width: 800px;

    .slides-container {
      display: flex;
      transition: transform 0.3s ease;
      width: 100%;

      .slide {
        min-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 0 40px;

        .wallet-container {
          display: flex;
          flex-direction: column;
          gap: 10px;

          //   align-items: start;
          //   justify-content: start;
          width: 100%;
          height: 600px;
          border-radius: 8px;
          border: 1px solid;

          h5 {
            margin: 0;
          }

          .wallet-title {
            padding: 10px;
            border-bottom: 1px solid;
          }

          .wallet-assets {
            display: flex;
            flex-direction: column;
            padding: 10px;
            overflow-y: auto;

            .wallet-asset.title {
              padding: 10px 0;
              border-bottom: 1px solid;

              span {
                text-transform: uppercase;
                opacity: 0.7;
              }

              span:not(:first-child) {
                text-align: end;
              }
            }

            .wallet-asset {
              display: grid;
              grid-template-columns: 50% 25% 25%;
              padding: 10px 0;
              border-bottom: 1px solid;

              .asset-info,
              .asset-price,
              .asset-holdings {
                display: flex;
                align-items: center;
              }

              .asset-info {
                gap: 5px;
                width: 100%;
              }

              .asset-price {
                // background: red;
                width: 100%;
                justify-content: flex-end;
              }

              .asset-holdings {
                flex-direction: column;
                align-items: flex-end;
                justify-content: center;
                // background: blue;
                width: 100%;
                gap: 5px;

                .add-asset {
                  border: 1px solid;
                  border-radius: 8px;
                }
              }
            }
          }
        }
      }

      .slide.selected {
        opacity: 1;
      }
    }
    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      border: none;
      padding: 0.5rem;
      cursor: pointer;
      font-size: 1.2rem;
      font-weight: bold;
    }

    .nav-button.left {
      left: 0;
      z-index: 6;
      border-right: none;
    }

    .nav-button.right {
      right: 0;
      border-left: none;
    }
  }
</style>
