<script lang="ts">
  import type { CoinListObject } from '$lib/binance/index'
  import { getTickersFullData } from '$lib/binance/index'
  import { onMount } from 'svelte'
  import WalletSlide from './WalletSlide.svelte'
  import data from './test.json'

  let sortedData: any[] = []

  onMount(async () => {
    const objectData: CoinListObject = await getTickersFullData()

    sortedData = Object.entries(objectData)
      .map(([symbol, { name, rank }]) => ({ symbol, name, rank }))
      .sort((a, b) => a.name.localeCompare(b.name))
  })
</script>

<svelte:head>
  <title>isma.codes - wallet</title>
</svelte:head>

<div class="wallet-container">
  <h1>Wallet</h1>
  <WalletSlide {data} />
</div>

<style lang="scss">
  @import '../../style/sizes.scss';

  .wallet-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media only screen and (min-width: $mobile) {
      --details-flex-direction: column;
      --align-items: start;
    }

    @media only screen and (min-width: $tablet) {
      --details-flex-direction: column;
      --align-items: center;
    }

    @media only screen and (min-width: $desktop) {
      --details-flex-direction: row;
      --align-items: center;
    }

    @media only screen and (min-width: $largeDesktop) {
      --details-flex-direction: row;
      --align-items: center;
    }
  }
</style>
