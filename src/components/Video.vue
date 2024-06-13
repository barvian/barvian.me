<script setup lang="ts">
import type { ImageMetadata } from 'astro'
import { onUnmounted, ref } from 'vue'
import { useElementVisibility, useEventListener } from '@vueuse/core'
import useTransitioning from '@/composables/useTransitioning'
import Spinner from '@/components/Spinner.vue'

const {
	class: className,
	forcePlay = false,
	spinner = true,
	src,
	muted = true,
	loop = true,
	autoplay = true,
	playsinline = true,
	poster,
	position = 'relative'
} = defineProps<{
	class?: string
	forcePlay?: boolean
	muted?: boolean
	playsinline?: boolean
	loop?: boolean
	autoplay?: boolean
	spinner?: boolean
	src: Array<{ file: string; type: string }>
	poster: ImageMetadata
	position?: string
}>()

const el = ref<HTMLDivElement>()
const video = ref<HTMLVideoElement>()
const inView = useElementVisibility(el)
const transitioning = useTransitioning()
const waiting = ref(false)
let waitingTimeout: NodeJS.Timeout
useEventListener(video, ['waiting', 'loadstart'], () => {
	if (waitingTimeout) clearTimeout(waitingTimeout)
	waitingTimeout = setTimeout(() => (waiting.value = true), 100)
})
useEventListener(video, ['playing', 'loadeddata'], () => {
	if (waitingTimeout) clearTimeout(waitingTimeout)
	waiting.value = false
})
onUnmounted(() => {
	if (waitingTimeout) clearTimeout(waitingTimeout)
})
</script>
<template>
	<div
		ref="el"
		:class="[className, position]"
		:style="{ aspectRatio: poster.width / poster.height }"
	>
		<video
			ref="video"
			:poster="poster.src"
			:muted
			:loop
			:playsinline
			:autoplay
			v-if="forcePlay || (!transitioning && inView)"
			class="size-full object-cover object-top"
		>
			<source v-for="{ file, type } in src" :src="file" :type="`video/${type}`" />
		</video>
		<img :src="poster.src" alt="" class="size-full object-cover object-top" v-else />
		<Spinner v-if="spinner && waiting && !transitioning" class="absolute bottom-4 left-4 size-7" />
		<slot />
	</div>
</template>
