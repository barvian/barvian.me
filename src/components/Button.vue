<script lang="ts" setup>
import External from '@/components/icons/External.vue'
import GitHub from './icons/GitHub.vue'
import X from './icons/X.vue'
import Dribbble from './icons/Dribbble.vue'
import Email from './icons/Email.vue'
import LinkedIn from './icons/LinkedIn.vue'
import { isExternal } from '@/utils/url'

// Discriminated unions didn't work with Vue here:
const {
	class: className,
	href,
	preset = 'primary',
	size = 'md',
	icon
} = defineProps<{
	class?: string // Astro's type checking doesn't like Vue's fallthrough attributes
	href?: string
	preset?: 'primary' | 'secondary' | 'tertiary'
	size?: 'sm' | 'md'
	icon?: 'external' | 'github' | 'x' | 'dribbble' | 'email' | 'linkedin'
}>()

const external = href && isExternal(href)

// prettier-ignore
const {
	Icon = undefined,
	iconClassName = '',
	iconRight = false
} = icon ? ({
    github: {
        Icon: GitHub,
        iconClassName: 'h-5'
    },
    x: {
        Icon: X,
        iconClassName: 'h-4'
    },
    linkedin: {
        Icon: LinkedIn,
        iconClassName: 'h-5'
    },
    email: {
        Icon: Email,
        iconClassName: 'h-4'
    },
    dribbble: {
        Icon: Dribbble,
        iconClassName: 'h-5'
    },
    external: {
        Icon: External,
        iconClassName: 'h-3',
        iconRight: true
    }
} as const)[icon] : {}
</script>
<template>
	<component
		:is="href ? 'a' : 'button'"
		ref="button"
		:href
		:rel="external ? 'external' : undefined"
		:target="external ? '_blank' : undefined"
		:class="[
			className,
			size === 'md' ? 'h-12' : 'h-8',
			'group relative isolate flex select-none items-center justify-center gap-3 overflow-clip rounded-full leading-snug transition ease-out-quad *:pointer-events-none',
			external && icon !== 'external' && 'cursor-external',
			$slots.default ?
				size === 'md' ?
					'px-7'
				:	'px-2.5 text-sm'
			:	'aspect-square',
			preset === 'primary' ?
				'bg-black font-medium text-white hover:bg-neutral-800 dark:bg-neutral-200 dark:text-black dark:hover:bg-white'
			:	['hover:bg-black/5 dark:hover:bg-white/10', preset === 'secondary' && 'ring-contrastier']
		]"
	>
		<component :is="Icon" :class="iconClassName" v-if="!iconRight && Icon" />
		<!-- <slot v-if="preset !== 'primary'" /> -->
		<!-- <span v-else-if="$slots.default" class="relative block overflow-hidden"> -->
		<!-- <span class="block transition group-hover:-translate-y-[108%] group-hover:skew-y-6"> -->
		<slot />
		<!-- </span> -->
		<!-- <span
				aria-hidden="true"
				class="absolute left-0 top-full skew-y-6 transition group-hover:-translate-y-full group-hover:skew-y-0"
			>
				<slot />
			</span> -->
		<!-- </span> -->
		<component :is="Icon" :class="iconClassName" v-if="iconRight && Icon" />
	</component>
</template>
