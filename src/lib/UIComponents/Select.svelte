<script lang="ts">
  import { onMount } from 'svelte'
  import type { SelectOption } from './types'

  export let data: SelectOption[] = []
  export let name: string = ''
  export let id: string = ''
  export let multiple: boolean = false
  export let required: boolean = false
  export let placeholder: string = ''

  onMount(() => {
    console.log('Select component mounted')
  })
</script>

<select {name} {id} {multiple} {required}>
  {#if placeholder && !multiple}
    <option value="" disabled selected>{placeholder}</option>
  {/if}
  {#each data as option (option.value)}
    <option value={option.value} disabled={option.disabled} selected={option.selected}>
      <iconify-icon icon="carbon:collapse-categories" />
      {#if option.icon != ''}{/if}
      {option.label}
    </option>
  {/each}
</select>

<style lang="scss">
  @import '../../style/sizes.scss';
  @import './index.scss';
</style>
