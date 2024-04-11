<script lang="ts">
  import data from '../data/personal.yml'
  let code = 'code'
</script>

<svelte:head>
  <title>isma.codes - home</title>
</svelte:head>

<div class="container">
  <div class="slogan">
    transforming <br />
    ideas into <span>{code}</span>
  </div>

  <div class="title">
    <h1>{data.title.name}</h1>
    <span>{@html data.title.position}</span>
  </div>
</div>

<style lang="scss">
  @import '../style/sizes.scss';
  @import '../style/colors.scss';

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - $nav-height);

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
        font-weight: 400;
      }
    }

    .slogan {
      font-size: 80px;
      font-weight: bolder;
      margin-top: -150px;

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
