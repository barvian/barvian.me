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
        iconAttr = undefined,
        iconRight = false,
        bgClassName = '[--bg:theme(colors.neutral.800)] dark:[--bg:theme(colors.neutral.100)]',
        textClassName = 'hover:text-white dark:hover:text-black'
    } = icon ? ({
        github: {
            Icon: GitHub,
            iconAttr: { class: 'h-5' }
        },
        x: {
            Icon: X,
            iconAttr: { class: 'h-4' }
        },
        linkedin: {
            Icon: LinkedIn,
            iconAttr: { class: 'h-5' },
            bgClassName: '[--bg:#0a66c2]',
            textClassName: 'hover:text-white'
        },
        email: {
            Icon: Email,
            iconAttr: { class: 'h-4' }
        },
        dribbble: {
            Icon: Dribbble,
            iconAttr: { class: 'h-5' },
            bgClassName: '[--bg:#ea4c89]',
            textClassName: 'hover:text-white'
        },
        external: {
            Icon: External,
            iconAttr: { class: 'h-3' },
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
            'group isolate overflow-clip hover:scale-110 active:duration-200 active:scale-100 relative *:pointer-events-none leading-snug h-12 font-medium rounded-full flex items-center justify-center gap-3',
            target == '_blank' && icon !== 'external' && 'cursor-external',
            $slots.default
                ? 'px-7'
                : 'aspect-square before:absolute before:-z-10 before:size-full before:inset-0 before:bg-[--bg] before:transition-[transform,opacity] hover:before:duration-[theme(transitionDuration.DEFAULT),theme(transitionDuration.100)] before:scale-[.85] before:opacity-0 hover:before:opacity-100 hover:before:scale-100 before:rounded-full',
            preset === 'primary'
                ? 'transition bg-black hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-white text-white dark:text-black'
                : [bgClassName, textClassName, 'transition hover:duration-100', preset === 'secondary' && 'shadow-[inset_0_0_0_1px] shadow-black/20 hover:shadow-transparent dark:shadow-white/45']
        ]"
    >
        <component :is="Icon" v-bind="iconAttr" v-if="!iconRight && Icon" />
        <span v-if="$slots.default" class="block relative overflow-hidden">
            <span class="block group-hover:-translate-y-[108%] group-hover:skew-y-6 transition">
                <slot />
            </span>
            <span aria-hidden="true" class="absolute top-full left-0 skew-y-6 group-hover:skew-y-0 group-hover:-translate-y-full transition">
                <slot />
            </span>
        </span>
        <component :is="Icon" v-bind="iconAttr" v-if="iconRight && Icon" />
    </component>
</template>