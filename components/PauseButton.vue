<script setup lang="ts">
    import Pause from '/components/icons/Pause.vue'
    import Play from '/components/icons/Play.vue'
    import { shouldAutoplay } from '/stores/autoplay'
</script>
<template>
    <button @click="shouldAutoplay = !shouldAutoplay" :aria-pressed="shouldAutoplay ? 'true' : 'false'" class="group size-10 rounded-full bg-neutral-700/70 text-white/80 hover:text-white/90 hover:bg-neutral-700/80 duration-75 transition-colors flex items-center justify-center" title="Autoplay videos">
        <Pause v-if="shouldAutoplay" class="h-4 transition duration-100 group-active:scale-90" />
        <Play v-else class="h-4 relative left-[0.0625rem] transition group-active:scale-90" />
    </button>
</template>