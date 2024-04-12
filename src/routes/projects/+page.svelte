<script lang="ts">
  import data from '../../data/projects.yml'

  import SearchInput from '$lib/SearchInput.svelte'

  type Project = {
    name: string
    description: string
    links: {
      name: string
      link: string
      icon: string
    }[]
    technologies: {
      icon: string
      name: string
      link: string
    }[]
  }

  let projects = data as Project[]
  let results = projects
  let searchableKeys = ['name', 'description', 'technologies.name', 'links.name']
</script>

<svelte:head>
  <title>isma.codes - projects</title>
</svelte:head>

<div class="input-container">
  <SearchInput bind:data={projects} bind:results {searchableKeys} />
</div>

<div class="container">
  {#each results as project}
    <div class="project-container">
      <div class="info">
        <h4>{project.name}</h4>
        <p>{project.description}</p>
      </div>
      <div class="lists">
        <div class="list">
          <strong>project-links:</strong>
          {#each project.links as link}
            <a target="_blank" href={link.link}><iconify-icon icon={link.icon} /></a>
          {/each}
        </div>
        <div class="list">
          <strong>stack-links:</strong>
          {#each project.technologies as tech}
            <a target="_blank" href={tech.link}>{tech.name}<iconify-icon icon={tech.icon} /></a>
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  @import '../../style/sizes.scss';

  .input-container {
    width: 500px;
    margin: 20px auto;
    max-width: 100%;
  }

  .container {
    @media only screen and (min-width: $mobile) {
      --column-count: 1;
    }

    @media only screen and (min-width: $tablet) {
      --column-count: 2;
    }

    @media only screen and (min-width: $desktop) {
      --column-count: 2;
    }

    @media only screen and (min-width: $largeDesktop) {
      --column-count: 2;
    }

    h4,
    a,
    p {
      margin: 0;
    }

    column-count: var(--column-count);
    column-gap: 10px;

    .project-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      border: 1px solid;
      border-radius: $tag-border-radius;
      gap: 20px;
      margin-bottom: 10px;
      break-inside: avoid;

      .info {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .lists {
        display: flex;
        flex-direction: column;
        gap: 10px;

        .list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;

          a {
            display: flex;
            align-items: center;
            gap: 5px;
            border-radius: $tag-border-radius;
            border: solid 1px;
            padding: 3px 6px;
          }
        }
      }
    }
  }
</style>
