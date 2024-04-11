<script lang="ts">
  import { onMount } from 'svelte'
  import Spinner from '$lib/Spinner.svelte'
  import data from '../../data/personal.yml'
  import type { WorkExperience } from './types'
  import style from './style.scss?inline'

  const { title, about, contact, education, languages, social, stack, experience } = data

  let skills: WorkExperience[] = []
  let loading = false

  type info = {
    date: Date
    link: string
  }

  let map = {
    tech: new Map<string, info>(),
    tools: new Map<string, info>(),
    roles: new Map<string, info>()
  }

  function updateMap(data: string[][] | string[], type: 'tech' | 'tools' | 'roles', from: string) {
    const fromDate = new Date(from)
    data.forEach((each) => {
      let key = Array.isArray(each) ? each[0] : each
      let value = map[type].get(each[0])?.date
      let link = Array.isArray(each) && each[1] ? each[1] : ''
      let date =
        value !== undefined && new Date(value) < fromDate ? new Date(value) : new Date(from)
      map[type].set(key, {
        date,
        link
      })
    })
  }

  let technologies: string[][] = []
  let tools: string[][] = []
  let roles: string[][] = []

  function getYears(from: Date): string {
    let to = new Date()

    const monthsDiff =
      (to.getFullYear() - from.getFullYear()) * 12 + to.getMonth() - from.getMonth()

    const lowerYear = Math.floor(monthsDiff / 12)
    const upperYear = Math.ceil(monthsDiff / 12)

    return lowerYear !== upperYear ? `${lowerYear}-${upperYear}` : `${lowerYear}`
  }

  const mapToArray = (map: Map<string, info>): string[][] => {
    const arrayData: [string, info][] = Array.from(map.entries())
    arrayData.sort((a, b) => a[1].date.getTime() - b[1].date.getTime())
    const resultArray: string[][] = arrayData.map(([key, value]) => [
      `${key} | ${getYears(value.date)}`,
      value.link
    ])
    return resultArray
  }

  let htmlContent: string

  async function download() {
    loading = true
    if (!htmlContent) {
      console.error('No content to download')
      return
    }

    try {
      const response = await fetch('/api/download-pdf', {
        method: 'POST',
        body: JSON.stringify({ html: htmlContent }),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        const currentDate = new Date()
        const isoDate = currentDate.toISOString()
        a.download = `${isoDate}-resume_ismael_pamplona.pdf`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      } else {
        console.error('Failed to download PDF')
      }
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }

    loading = false
  }

  function getYearFromIso(date: string): number {
    return new Date(date).getFullYear()
  }

  function getShortISODate(date: string | Date): string {
    let d = new Date(date)
    let s = d.toUTCString()
    return `${s.substring(8, 16)}`
  }

  async function generateSummary() {
    skills = JSON.parse(JSON.stringify(experience.data))
    skills.forEach((position) => {
      position.jobs &&
        position.jobs.data.forEach((job) => {
          job.technologies && updateMap(job.technologies.data, 'tech', position.from)
          job.tools && updateMap(job.tools.data, 'tools', position.from)
          job.roles && updateMap(job.roles.data, 'roles', position.from)
        })
    })

    technologies = mapToArray(map.tech)
    tools = mapToArray(map.tools)
    roles = mapToArray(map.roles)
  }

  onMount(async () => {
    await generateSummary()
    const container = document.getElementById('resume-container')
    if (container) {
      htmlContent = `<style>${style}</style>` + container.innerHTML
    }
  })
</script>

{#if loading}<Spinner />{/if}

<svelte:head>
  <title>isma.codes - resume|cv</title>
</svelte:head>

<div
  aria-label="download-resume"
  role="button"
  class="download-btn-container"
  tabindex="0"
  on:click={download}
  on:keydown={(event) => event.key === 'Enter' && download()}
>
  <iconify-icon class="icon download" icon="ic:baseline-download"></iconify-icon>
  <span>download</span>
</div>

<div class="resume-container" id="resume-container">
  <section>
    <h1>{title.name}</h1>
    <span>{@html title.position}</span>
  </section>

  <section>
    <h2>{contact.title}</h2>
    <ul>
      <li class="icon-link">
        <iconify-icon class="icon" icon={contact.city.icon} />{contact.city.text}
      </li>
      <li class="icon-link">
        <iconify-icon class="icon" icon={contact.phone.icon} />{contact.phone.text}
      </li>
      <li class="icon-link">
        <iconify-icon class="icon" icon={contact.email.icon} /><a href="mailto:{contact.email.text}"
          >{contact.email.text}</a
        >
      </li>
    </ul>
  </section>

  <section>
    <h2>{about.title}</h2>
    {#each about.data as p}
      <p>{p}</p>
    {/each}
  </section>

  <section>
    <h2>{education.title}</h2>
    {#each education.data as item}
      <div class="education-item">
        <p>
          <strong>{item.title}</strong> ({getYearFromIso(item.from)} - {getYearFromIso(item.to)})
        </p>
        <p>at <a href={item.link}>{item.university}</a></p>
      </div>
    {/each}
  </section>

  <section>
    <h2>{languages.title}</h2>
    <ul>
      {#each languages.data as lang}
        <li>{lang}</li>
      {/each}
    </ul>
  </section>

  <section>
    <h2>{social.title}</h2>
    {#each social.data as s}
      <a class="icon-link" target="_blank" href={s.link}
        ><iconify-icon class="icon" icon={s.icon} />{s.link.substring(8)}</a
      >
    {/each}
  </section>

  <section>
    <h2>{stack.title}</h2>
    {#each stack.data as s}
      <a class="icon-link" target="_blank" href={s.link}>
        <iconify-icon class="icon" icon={s.icon} />{s.description} | ({s.title})
      </a>
    {/each}
  </section>

  <section>
    <h2>
      Stack, tools and skills &nbsp<span class="years-experience">
        | &nbsp years of experience</span
      >
    </h2>
    <div class="skills-tags">
      <h5>Stack:</h5>
      {#each technologies as tech}
        <a class="tag" target="_blank" href={tech[1]}>{tech[0]} </a>
      {/each}
    </div>
    <div class="skills-tags">
      <h5>Tools:</h5>
      {#each tools as tool}
        <a class="tag" target="_blank" href={tool[1]}>{tool[0]} </a>
      {/each}
    </div>
  </section>

  <section>
    <h2>{experience.title}</h2>

    {#each experience.data as pos}
      {#if pos.show}
        <div class="experience-header">
          <h3>{pos.title}</h3>
          <div class="experience-details">
            <div class="company-details">
              <h4>{pos.company}</h4>
              <div class="company-location">
                <iconify-icon class="icon" icon="teenyicons:pin-outline" />
                <span>{pos.city}|</span>
                <span>{pos.country}</span>
              </div>
            </div>
            <div class="experience-period">
              <span>
                {getShortISODate(pos.from)} -
                {pos.to !== 'Present' ? getShortISODate(pos.to) : 'Present'}
              </span>
            </div>
          </div>
        </div>

        {#each pos.description as desc}
          <p>{@html desc}</p>
        {/each}

        <ul class="duties">
          {#each pos.duties.data as role}
            <li>- {@html role}</li>
          {/each}
        </ul>

        <div class="experience-jobs">
          <!-- <h4 class="jobs-header">{pos.jobs.title}</h4> -->
          {#each pos.jobs.data as job}
            <div class="job-container">
              <h5>{job.title}</h5>
              <p>{@html job.description}</p>
              <div class="job-skills">
                {#if job.technologies}
                  <div class="job-skills-tags">
                    <span class="job-tag-title">{job.technologies.title}:</span>
                    {#each job.technologies.data as t}
                      <a class="tag" target="_blank" href={t[1]}>{t[0]} </a>
                    {/each}
                  </div>
                {/if}
                {#if job.roles}
                  <div class="job-skills-tags">
                    <span class="job-tag-title">{job.roles.title}:</span>
                    {#each job.roles.data as r}
                      <span class="tag">{r}</span>
                    {/each}
                  </div>
                {/if}
                {#if job.tools}
                  <div class="job-skills-tags">
                    <span class="job-tag-title">{job.tools.title}:</span>
                    {#each job.tools.data as t}
                      <a class="tag" target="_blank" href={t[1]}>{t[0]} </a>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    {/each}
  </section>
</div>

<style lang="scss">
  @import './style.scss';

  .download-btn-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 2px;
    cursor: pointer;
    padding: 0;
    font-size: 20px;
    margin-top: 20px;

    span {
      font-size: 15px;
    }
  }

  a,
  p,
  li,
  span,
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: inherit;
  }

  h1 {
    font-size: 3em;
  }

  h2 {
    font-size: 2.5em;
  }

  h3 {
    font-size: 2.2em;
  }

  h4 {
    font-size: 1.9em;
  }

  h5 {
    font-size: 1.6em;
  }

  p,
  span,
  li,
  a,
  .icon-link {
    font-size: 1em;
    margin: 3px 0;
  }

  a {
    color: inherit;
  }

  .icon {
    display: block;
  }

  .skills-tags {
    gap: 0 5px;
  }
</style>
