import { isTransitionBeforePreparationEvent } from 'astro:transitions/client'
import {
	isTransitionBeforeSwapEvent,
	type TransitionBeforeSwapEvent
} from 'astro:transitions/client'
import { atom } from 'nanostores'

export const $url = atom<URL | Location | undefined>(
	!import.meta.env.SSR ? window.location : undefined
) // filled by middleware on server
if (!import.meta.env.SSR)
	document.addEventListener('astro:before-preparation', (event) => {
		if (!isTransitionBeforePreparationEvent(event)) return
		$url.set(event.to)
	})

// Gets whether the page is transitioning (starting before swap, ending after transition)
export const $transitioning = atom<TransitionBeforeSwapEvent | undefined>()
if (!import.meta.env.SSR) {
	document.addEventListener('astro:before-swap', (event) => {
		if (!isTransitionBeforeSwapEvent(event)) return
		$transitioning.set(event)
	})
	document.addEventListener('astro:after-transition', async () => {
		$transitioning.set(undefined)
	})
}
