<script lang="ts">
  import 'iconify-icon'
  import '../style/index.scss'
  import Nav from '$lib/Nav/Nav.svelte'
  import Footer from '$lib/Footer.svelte'
  import Assistant from '$lib/Assistant/Assistant.svelte'
  import { darkMode } from '$lib/Nav/stores'
  import type { ChatCompletion } from '$lib/openai/types'

  export let data: ChatCompletion
</script>

<div class={$darkMode ? 'dark-theme' : 'light-theme'}>
  <Nav />
  <div class="body-container">
    <div class="slot-container">
      <slot />
    </div>
  </div>
  <Assistant bind:data />
  <Footer />
</div>

<style lang="scss">
  @import '../style/sizes.scss';

  .body-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: calc(100vh - $nav-height);
    padding: 0 20px;

    .slot-container {
      max-width: 100%;
      width: $page-width;
    }
  }
</style>
