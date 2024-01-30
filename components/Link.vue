<!-- Sets rel, target, and cursor for external links -->
<script lang="ts" setup>
  import { useAttrs } from 'vue'
  import { isExternal } from '/utils/url'
  const attrs = useAttrs()

  const external = typeof attrs.href === 'string' && isExternal(attrs.href)
</script>

<template>
  <a :rel="external ? 'external' : undefined" :target="external ? '_blank' : undefined" :class="{ 'cursor-external': external }">
    <slot />
  </a>
</template>