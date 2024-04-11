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
        <h2>{project.name}</h2>
        <span>{project.description}</span>
      </div>
      <div class="lists">
        <div class="list">
          <h4>project-links:</h4>
          {#each project.links as link}
            <a target="_blank" href={link.link}><iconify-icon icon={link.icon} /></a>
          {/each}
        </div>
        <div class="list">
          <h4>stack-links:</h4>
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
  }

  .container {
    display: grid;
    grid-template-columns: 50% 50%;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding-bottom: 20px;

    .project-container {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 20px;
      padding: 10px;
      border: 1px solid;
      border-radius: $tag-border-radius;

      .info {
        display: flex;
        flex-direction: column;
        gap: 5px;
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
