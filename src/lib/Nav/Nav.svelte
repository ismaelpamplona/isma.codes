<script lang="ts">
  import { page } from '$app/stores'
  import { darkMode } from './stores'
  import links from '../../data/links.yml'
  import type { Link } from '../../types/links'

  import Logo from '$lib/Logo.svelte'

  let navLinks = links as Link[]

  let showHamburguerMenu = false

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

      <button
        title="Switch theme"
        aria-label="Switch theme"
        tabIndex="0"
        on:click={toggleTheme}
        on:keyup={toggleTheme}
      >
        <iconify-icon icon={$darkMode ? 'emojione-v1:sun' : 'ph:moon-duotone'} />
      </button>
    </div>

    <div class="hamburguer {showHamburguerMenu ? 'hamburguer-opened' : 'hamburguer-closed'}">
      <div class="hamburguer-header">
        {#if showHamburguerMenu}<Logo />{/if}
        <button
          title="Switch theme"
          aria-label="Switch theme"
          tabIndex="0"
          on:click={() => (showHamburguerMenu = !showHamburguerMenu)}
          on:keyup={toggleTheme}
        >
          <iconify-icon
            icon={showHamburguerMenu
              ? 'line-md:menu-to-close-alt-transition'
              : 'line-md:close-to-menu-alt-transition'}
          />
        </button>
      </div>

      {#if showHamburguerMenu}
        <div class="hamburger-links">
          {#each navLinks as link}
            <a
              href={link.href}
              title={link.title}
              aria-label={link.title}
              on:click={() => (showHamburguerMenu = false)}
              class={$page.url.pathname === link.href ? 'active' : ''}>{link.text}</a
            >
          {/each}
          <button
            title="Switch theme"
            aria-label="Switch theme"
            tabIndex="0"
            on:click={toggleTheme}
          >
            <iconify-icon class="icon" icon={$darkMode ? 'emojione-v1:sun' : 'ph:moon-duotone'} />
          </button>
        </div>
        <span class="copyright">© 2024 Ismael Pamplona. All rights reserved.</span>
      {/if}
    </div>
  </nav>
</header>

<style lang="scss">
  @import '../../style/sizes.scss';
  @import '../../style/colors.scss';

  nav {
    @media only screen and (min-width: $mobile) {
      --show-links: none;
      --show-hamburger: flex;
    }

    @media only screen and (min-width: $tablet) {
      --show-links: none;
      --show-hamburger: flex;
    }

    @media only screen and (min-width: $desktop) {
      --show-links: flex;
      --show-hamburger: none;
    }

    @media only screen and (min-width: $largeDesktop) {
      --show-links: flex;
      --show-hamburger: none;
    }

    position: sticky;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: $nav-height;
    z-index: 2;
    top: 0;

    .hamburguer-opened {
      height: 100vh;
      width: 100%;
      opacity: 0.98;
      position: fixed;
    }

    .hamburguer {
      display: var(--show-hamburger);
      flex-direction: column;
      align-items: flex-end;
      justify-content: flex-start;
      top: 0;
      right: 0;

      .hamburguer-header {
        display: flex;
        width: 100%;
        justify-content: space-between;

        button {
          font-size: 35px;
          z-index: 20;
          height: $nav-height;
        }
      }

      .hamburger-links {
        display: flex;
        flex-direction: column;
        right: 0;
        top: $nav-height;
        padding: 20px;
      }
    }

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
      display: var(--show-links);
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

  .copyright {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-size: 10px;
    padding: 10px;
  }
</style>
