import { isTransitionBeforePreparationEvent } from 'astro:transitions/client'
import { computed, shallowRef } from 'vue'

export const url = shallowRef<URL | Location | undefined>(typeof window !== 'undefined' ? window.location : undefined) // filled by middleware on server
if (typeof document !== 'undefined') document.addEventListener('astro:before-preparation', (event) => {
    if (!isTransitionBeforePreparationEvent(event)) return
    url.value = event.to
})