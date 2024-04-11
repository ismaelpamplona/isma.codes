<script lang="ts">
  import data from '../data/personal.yml'
  import { page } from '$app/stores'
  import links from '../data/links.yml'
  import type { Link } from '../types/links'

  let navLinks = links as Link[]

  let socialLinks = data.social.data
  let contacts = data.contact
</script>

<footer>
  <div class="content">
    <div class="list links">
      <span class="title">pages:</span>
      {#each navLinks as link}
        <a
          href={link.href}
          title={link.title}
          aria-label={link.title}
          class={$page.url.pathname === link.href ? 'active' : ''}>{link.text}</a
        >
      {/each}
    </div>
    <div class="list social-network">
      <span class="title">social:</span>
      {#each socialLinks as link}
        <a
          target="_blank"
          href={link.link}
          title={link.title}
          aria-label={link.title}
          class={$page.url.pathname === link.href ? 'active' : ''}
        >
          <iconify-icon class="icon" icon={link.icon} /> <span>{link.text}</span>
        </a>
      {/each}
    </div>
    <div class="list contacts">
      <span class="title">contact:</span>
      <span
        ><iconify-icon class="icon" icon={contacts.city.icon} />
        <span>{contacts.city.text}</span></span
      >
      <span
        ><iconify-icon class="icon" icon={contacts.phone.icon} />
        <span>{contacts.phone.text}</span></span
      >
      <span
        ><iconify-icon class="icon" icon={contacts.email.icon} />
        <span>{contacts.email.text}</span></span
      >
    </div>
  </div>
  <span class="copyright">© 2024 Ismael Pamplona. All rights reserved.</span>
</footer>

<style lang="scss">
  @import '../style/colors.scss';

  footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 30px;

    .content,
    .copyright {
      width: 800px;
      max-width: 100%;
      justify-content: center;
      padding-left: 2rem;
      padding-right: 2rem;
    }

    .content {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      gap: 2rem;

      .title {
        font-weight: bold;
        font-size: 20px;
      }

      .list {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        a,
        span {
          display: flex;
          align-items: center;
          gap: 5px;
        }
      }

      .links {
        .active {
          width: fit-content;
          border-bottom: $metallic-red 1px solid;
        }
      }
    }

    .copyright {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding-top: 20px;
    }
  }
</style>
