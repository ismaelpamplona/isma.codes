<script lang="ts">
  import { onMount } from 'svelte'
  import { fuzzySearch, throttle } from '../../helpers/utils'

  export let data: any[]
  export let results: any[] = data
  export let searchableKeys: string[]
  export let placeholder: string = 'Seach...'
  export let icon: string = 'mdi:search'

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

<div class="tag-wrapper">
  <input type="text" {placeholder} />
  <iconify-icon {icon} />
</div>

<style lang="scss">
  @import '../../style/sizes.scss';
  @import './index.scss';
</style>
