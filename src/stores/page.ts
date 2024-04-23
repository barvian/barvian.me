import { isTransitionBeforePreparationEvent } from 'astro:transitions/client'
import { shallowRef } from 'vue'

export const url = shallowRef<URL | Location | undefined>(
	!import.meta.env.SSR ? window.location : undefined
) // filled by middleware on server
if (!import.meta.env.SSR)
	document.addEventListener('astro:before-preparation', (event) => {
		if (!isTransitionBeforePreparationEvent(event)) return
		url.value = event.to
	})
