import {
	isTransitionBeforeSwapEvent,
	type TransitionBeforeSwapEvent
} from 'astro:transitions/client'
import { ref } from 'vue'

// Gets whether the page is transitioning (starting before swap, ending after transition)
const transitioning = ref<TransitionBeforeSwapEvent>()
if (!import.meta.env.SSR) {
	document.addEventListener('astro:before-swap', (event) => {
		if (!isTransitionBeforeSwapEvent(event)) return
		transitioning.value = event
	})
	document.addEventListener('astro:after-transition', async () => {
		transitioning.value = undefined
	})
}

export default () => transitioning
