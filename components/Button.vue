<script lang="ts" setup>
    import External from '/components/icons/External.vue'
    import GitHub from './icons/GitHub.vue'
    import X from './icons/X.vue'
    import Dribbble from './icons/Dribbble.vue'
    import Email from './icons/Email.vue'
    import LinkedIn from './icons/LinkedIn.vue'

    const { href, preset = 'primary', icon } = defineProps<{
        href?: string
        preset?: 'primary' | 'secondary' | 'tertiary'
        icon?: 'external' | 'github' | 'x' | 'dribbble' | 'email' | 'linkedin'
        target?: string
    }>()

    const {
        Icon = undefined,
        iconClassName = '',
        iconRight = false,
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
        :target
        :class="[
            'transition group hover:scale-110 active:scale-100 active:duration-200 isolate overflow-clip relative *:pointer-events-none leading-snug h-12 font-medium rounded-full flex items-center justify-center gap-3',
            target == '_blank' && icon !== 'external' && 'cursor-external',
            $slots.default
                ? 'px-7'
                : 'aspect-square',
            preset === 'primary'
                ? 'bg-black hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-black'
                : ['hover:bg-black/5 dark:hover:bg-white/20', preset === 'secondary' && 'border border-black/20 dark:border-white/45']
        ]"
    >
        <component :is="Icon" :class="iconClassName" v-if="!iconRight && Icon" />
        <span v-if="$slots.default" class="block relative overflow-hidden">
            <span class="block group-hover:-translate-y-[108%] group-hover:skew-y-6 transition">
                <slot />
            </span>
            <span aria-hidden="true" class="absolute top-full left-0 skew-y-6 group-hover:skew-y-0 group-hover:-translate-y-full transition">
                <slot />
            </span>
        </span>
        <component :is="Icon" :class="iconClassName" v-if="iconRight && Icon" />
    </component>
</template>