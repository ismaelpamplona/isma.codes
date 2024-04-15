<script lang="ts">
  import Tickers from '$lib/Tickers.svelte'
  import { onMount } from 'svelte'
  import data from '../data/personal.yml'

  let code = 'code'
  let showTicker = true

  onMount(() => setTimeout(() => (showTicker = true), 5000))
</script>

<svelte:head>
  <title>isma.codes - home</title>
</svelte:head>

<div class="container">
  <div class="sentence">
    <div class="slogan">
      transforming <br />
      ideas into <span>{code}</span>
    </div>

    <div class="title">
      <h3>{data.title.name}</h3>
      <span>{@html data.title.position}</span>
    </div>
  </div>
  <div class="tickers-container {showTicker ? 'show-ticker ' : 'hide-ticker'}">
    <Tickers />
  </div>
</div>

<style lang="scss">
  @import '../style/sizes.scss';
  @import '../style/colors.scss';

  .container {
    @media only screen and (min-width: $mobile) {
      --slogan-font-size: 45px;
    }

    @media only screen and (min-width: $tablet) {
      --slogan-font-size: 60px;
    }

    @media only screen and (min-width: $desktop) {
      --slogan-font-size: 70px;
    }

    @media only screen and (min-width: $largeDesktop) {
      --slogan-font-size: 80px;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: calc(100vh - $nav-height);

    .show-ticker {
      opacity: 1;
    }

    .hide-ticker {
      opacity: 0;
    }

    .tickers-container {
      left: 0;
      right: 0;
      bottom: 0;
      position: absolute;
      padding: 5px;
    }

    .sentence {
      display: flex;
      top: 0;
      flex-direction: column;
      gap: 200px;
    }

    .title,
    .slogan {
      max-width: 100%;
      width: $page-width;
    }

    .title {
      display: flex;
      flex-direction: column;
      align-items: end;
      h3,
      span {
        margin: 0;
      }

      span {
        font-weight: 400;
      }
    }

    .slogan {
      font-size: var(--slogan-font-size);
      font-weight: bolder;
      @keyframes gradientAnimation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }

      span {
        display: inline-block;
        background-size: 200% 200%;
        background-image: linear-gradient(
          to right,
          $rainbow-indigo,
          $dark-sky-blue,
          $metallic-red,
          $lighter-red,
          $space-cadet
        );
        animation: gradientAnimation 10s ease infinite;
        -webkit-background-clip: text;
        color: transparent;
      }
    }
  }
</style>
