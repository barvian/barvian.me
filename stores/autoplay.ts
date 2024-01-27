import { useStorage, usePreferredReducedMotion } from "@vueuse/core"
import { watch } from 'vue'

const preferredMotion = usePreferredReducedMotion()
export const shouldAutoplay = useStorage('autoplay', preferredMotion.value === 'no-preference')
watch(preferredMotion, (motion) => {
    if (motion === 'reduce') shouldAutoplay.value = false
    else if (motion === 'no-preference') shouldAutoplay.value = true
})