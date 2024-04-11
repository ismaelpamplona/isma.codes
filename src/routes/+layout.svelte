<script lang="ts">
  import 'iconify-icon'
  import '../style/index.scss'
  import Nav from '$lib/Nav/Nav.svelte'
  import { darkMode } from '$lib/Nav/stores'
</script>

<div class={$darkMode ? 'dark-theme' : 'light-theme'}>
  <Nav />
  <div class="body-container">
    <slot />
  </div>
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
  }
</style>
