<script setup lang="ts">
    import { ref } from 'vue';
    import Button from '/components/Button.vue'
    import { vOnClickOutside } from '@vueuse/components';
    import { breakpointsTailwind, useBreakpoints, useMediaQuery } from '@vueuse/core'
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const canHover = useMediaQuery('(hover: hover)')

    const socialExpanded = ref(false)
    const maxSm = breakpoints.smaller('sm')
</script>
<template>
    <header class="container py-10vh flex justify-between items-center">
        <h1 class="text-lg/snug w-fit relative transition" :class="{ 'max-[400px]:opacity-0 max-[550px]:opacity-30': socialExpanded }">
            <div role="none" class="top-2 right-full size-0.5 absolute invisible mr-3.5" style="view-transition-name: back" />
            <span style="view-transition-name: name">Maxwell Barvian</span><br/>
            <span style="view-transition-name: title;">Front-end Developer</span>
        </h1>
        <div class="max-sm:relative sm:contents">
            <div class="max-sm:absolute max-sm:right-0 max-sm:top-1/2 max-sm:-translate-y-1/2 sm:contents">
                <nav ref="social" @mouseenter="canHover && (socialExpanded = true)" @mouseleave="socialExpanded = false" v-on-click-outside="() => socialExpanded = false" id="social" aria-label="Social links" class="flex isolate max-sm:-space-x-9 max-sm:*:transition-all max-[400px]:-space-x-11 max-sm:*:bg-white/10 max-sm:*:backdrop-blur-lg gap-2 sm:gap-4 items-center" :class="{ 'max-sm:!space-x-0': socialExpanded }">
                    <Button icon="email" href="mailto:max@barvian.me" preset="tertiary" />
                    <Button class="-z-10" icon="linkedin" href="https://linkedin.com/in/barvian" target="_blank" preset="tertiary" />
                    <Button class="-z-20" icon="github" target="_blank" href="https://github.com/barvian" preset="tertiary" />
                    <Button class="-z-30" icon="dribbble" target="_blank" href="https://dribbble.com/barvian" preset="tertiary" />
                    <Button class="-z-40" icon="x" target="_blank" href="https://x.com/mbarvian" preset="tertiary" />
                </nav>
                <button aria-controls="social" v-if="!canHover && maxSm && !socialExpanded" @click="socialExpanded = true" :aria-expanded="socialExpanded ? 'true' : 'false'" class="absolute inset-0 size-full" />
            </div>
        </div>
    </header>
</template>