<script lang="ts">
  import { page } from '$app/stores'
  import { darkMode } from './stores'
  import links from '../../data/links.yml'
  import type { Link } from '../../types/links'

  import Logo from '$lib/Logo.svelte'

  let navLinks = links as Link[]

  function toggleTheme() {
    darkMode.update((mode) => !mode)
  }
</script>

<header>
  <nav>
    <a href="/" title="Go to Home Page" aria-label="Home Page" aria-labelledby="homeLabel">
      <Logo />
    </a>

    <div class="links">
      {#each navLinks as link}
        <a
          href={link.href}
          title={link.title}
          aria-label={link.title}
          class={$page.url.pathname === link.href ? 'active' : ''}>{link.text}</a
        >
      {/each}
      <span
        title="witch theme"
        aria-label="Switch theme"
        on:click={toggleTheme}
        on:keyup={toggleTheme}
      >
        <iconify-icon class="icon" icon={$darkMode ? 'emojione-v1:sun' : 'ph:moon-duotone'} />
      </span>
    </div>
  </nav>
</header>

<style lang="scss">
  @import '../../style/sizes.scss';
  @import '../../style/colors.scss';

  nav {
    position: sticky;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: $nav-height;
    z-index: 2;
    top: 0;

    a {
      font-weight: 400;
      font-size: 20px;
      padding: 10px 15px;
      border-radius: 5px;
    }

    .active {
      border-bottom: $metallic-red 5px solid;
    }

    .links {
      display: flex;
      padding-right: 20px;

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        padding-left: 15px;

        &:hover {
          cursor: pointer;
          opacity: $link-opacity;
        }
      }
    }
  }
</style>
