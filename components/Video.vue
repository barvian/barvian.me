<script setup lang="ts">
import { type ImageMetadata } from 'astro'
import { ref } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import useTransitioning from '/composables/useTransitioning'

const {
	class: className,
	forcePlay = false,
	src,
	muted,
	loop,
	autoplay,
	playsinline,
	poster
} = defineProps<{
	class: string
	forcePlay: boolean
	muted: boolean
	playsinline: boolean
	loop: boolean
	autoplay: boolean
	src: Record<string, string>
	poster: ImageMetadata
}>()

const el = ref<HTMLDivElement>()
const inView = useElementVisibility(el)
const transitioning = useTransitioning()
</script>
<template>
	<div
		ref="el"
		:class="['relative', className]"
		:style="{ aspectRatio: poster.width / poster.height }"
	>
		<video
			:poster="poster.src"
			:muted
			:loop
			:playsinline
			:autoplay
			v-if="forcePlay || (!transitioning && inView)"
			class="size-full object-cover object-top"
		>
			<source v-for="[type, s] in Object.entries(src)" :src="s" :type />
		</video>
		<img :src="poster.src" alt="" class="size-full object-cover object-top" v-else />
	</div>
</template>
