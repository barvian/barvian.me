<script setup lang="ts">
    type Props = {
        logoTag?: 'h1' | 'span'
    }
    const props = withDefaults(defineProps<Props>(), {
        logoTag: 'h1'
    })
</script>
<template>
    <header class="mb-10">
        <nav>
            <component :is="props.logoTag" class="text-lg/snug">Maxwell Barvian,<br/> Front-end Developer</component>
        </nav>
    </header>
</template>