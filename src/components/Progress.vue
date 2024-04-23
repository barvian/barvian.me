<template>
	<div id="nprogress-container"></div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { isTransitionBeforePreparationEvent } from 'astro:transitions/client'
import NProgress from 'nprogress'
import { onMounted } from 'vue'

onMounted(() => {
	NProgress.configure({
		parent: '#nprogress-container',
		showSpinner: false
	})
})

if (!import.meta.env.SSR) {
	useEventListener(document, 'astro:before-preparation', (event) => {
		if (!isTransitionBeforePreparationEvent(event)) return

		NProgress.start()
	})
	useEventListener(document, 'astro:after-swap', (event) => {
		NProgress.done()
	})
}
</script>

<style>
@import 'nprogress/nprogress.css';

#nprogress-container {
	view-transition-name: nprogress;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;

	#nprogress {
		.bar {
			/*background: highlight;
			background: accentcolor;*/
			position: static !important;
		}

		.peg {
			box-shadow:
				0 0 10px highlight,
				0 0 5px highlight;
			box-shadow:
				0 0 10px accentcolor,
				0 0 5px accentcolor;
		}
	}
}

::view-transition-old(nprogress) {
	/* This is a persistent element, so let the new always show on top. See https://developer.chrome.com/docs/web-platform/view-transitions#making_the_most_of_content_you_already_have */
	animation: none;
	opacity: 0;
}

::view-transition-new(nprogress) {
	animation: none;
}
</style>
