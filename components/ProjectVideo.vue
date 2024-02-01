<script lang="ts" setup>
import { type ProjectEntry } from '/schemas/work'
import useTransitioning from '/composables/useTransitioning'
import Video from '/components/Video.vue'

defineOptions({
	// It gets weird with Astro's transition persist stuff:
	inheritAttrs: false
})

const { data, slug } = defineProps<{
	data: ProjectEntry['data']
	slug: ProjectEntry['slug']
}>()

const transitioning = useTransitioning()
const hasDemo = typeof window !== 'undefined' && window.__PROJECTS_WITH_DEMOS__.includes(slug)
</script>
<template>
	<Video
		class="!aspect-golden w-full overflow-clip rounded-xl object-cover transition group-hover/card:scale-[1.025] group-hover/card:shadow-xl group-focus-visible/card:outline group-active/card:scale-[1] group-active/card:shadow-none group-active/card:duration-200 group-data-[project=active]/card:scale-[1] group-data-[project=active]/card:shadow-none group-data-[project=active]/card:duration-200 group-data-[project=active]/card:[view-transition-name:project-hero] group-has/hero:rounded-2xl group-has/hero:[view-transition-name:project-hero] dark:!shadow-none"
		:forcePlay="
			(transitioning?.from.pathname === '/' + slug && !hasDemo) ||
			transitioning?.to.pathname === '/' + slug
		"
		:src="data.video"
		:poster="data.poster"
		muted
		playsinline
		loop
		autoplay
	/>
</template>
