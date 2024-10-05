<script lang="ts">
  import { onMount } from 'svelte'
  import { fuzzySearch, throttle } from '../helpers/utils'

  export let data: any[]
  export let results: any[] = data
  export let searchableKeys: string[]

  function searchForData(e: Event) {
    const target = e.target as HTMLInputElement
    if (target && target.value !== '') {
      throttle(() => {
        results = fuzzySearch(data, target.value, searchableKeys, 0.3).map((r) => r.item)
      }, 500)()
    } else {
      results = data
    }
  }

  onMount(() => {
    document.querySelector('input')?.addEventListener('input', searchForData)
  })
</script>

<input type="text" placeholder="Search..." />

<style lang="scss">
  @import '../style/sizes.scss';

  input {
    border-radius: calc($tag-border-radius * 2);
    width: 100%;
    height: 2.5rem;
    padding: 0 15px;
    max-width: 90vw;
  }
</style>
