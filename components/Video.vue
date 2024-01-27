<script setup lang="ts">
    import { ref, watchEffect } from 'vue'
    import { shouldAutoplay } from '/stores/autoplay'
    const video = ref<HTMLVideoElement>()
    watchEffect(() => {
        if (shouldAutoplay.value) video.value?.play()
        else video.value?.pause()
    }, { flush: 'sync' })
</script>
<template>
    <video ref="video" />
</template>