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
      <h1>{data.title.name}</h1>
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
      --h1-size: 20px;
      --span-size: 15px;
    }

    @media only screen and (min-width: $tablet) {
      --slogan-font-size: 60px;
      --h1-size: 30px;
      --span-size: 20px;
    }

    @media only screen and (min-width: $desktop) {
      --slogan-font-size: 70px;
      --h1-size: 30px;
      --span-size: 20px;
    }

    @media only screen and (min-width: $largeDesktop) {
      --slogan-font-size: 80px;
      --h1-size: 35px;
      --span-size: 20px;
    }

    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    }

    .sentence {
      display: flex;
      top: 0;
      flex-direction: column;
      justify-content: flex-start;
      height: 100%;
    }

    .title,
    .slogan {
      max-width: 100%;
      width: $page-width;
      padding: 50px 0;
    }

    .title {
      display: flex;
      flex-direction: column;
      align-items: end;
      h1,
      span {
        text-align: end;
      }

      h1 {
        font-weight: 600;
        font-size: var(--h1-size);
      }

      span {
        font-weight: 400;
        font-size: var(--span-size);
      }
    }

    .slogan {
      font-size: var(--slogan-font-size);
      font-weight: bolder;
      margin-top: 100px;

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
