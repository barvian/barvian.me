<script lang="ts" setup>
import type { ProjectEntry } from '@/schemas/work'
import useTransitioning from '@/composables/useTransitioning'
import Video from '@/components/Video.vue'

defineOptions({
	// It gets weird with Astro's transition persist stuff:
	inheritAttrs: false
})

const {
	src,
	poster,
	slug,
	needsContrastOnWhite = false
} = defineProps<{
	slug: ProjectEntry['slug']
	src: ProjectEntry['data']['video']
	poster: ImageMetadata
	needsContrastOnWhite: boolean
}>()

const transitioning = useTransitioning()
const hasDemo = !import.meta.env.SSR && window.__PROJECTS_WITH_DEMOS__.includes(slug)
</script>
<template>
	<Video
		class="!aspect-golden w-full overflow-clip rounded-2.5cqw transition group-hover/card:scale-[1.025] group-hover/card:shadow-2xl group-focus-visible/card:outline group-active/card:scale-[1] group-active/card:shadow-none group-active/card:duration-200 group-data-[project=active]/card:scale-[1] group-data-[project=active]/card:shadow-none group-data-[project=active]/card:duration-200 group-data-[project=active]/card:[view-transition-name:project-hero] group-has/hero:[view-transition-name:project-hero] dark:!shadow-none"
		:forcePlay="
			(transitioning?.from.pathname === '/' + slug && !hasDemo) ||
			transitioning?.to.pathname === '/' + slug
		"
		muted
		playsinline
		loop
		autoplay
		:src
		:poster
	>
		<div
			v-if="needsContrastOnWhite"
			class="absolute inset-0 rounded-2.5cqw ring-1 ring-inset ring-black/5 dark:hidden"
		/>
	</Video>
</template>
