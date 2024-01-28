<script lang="ts" setup>
    import External from '/components/icons/External.vue'
    import GitHub from './icons/GitHub.vue'

    const { href, secondary = false, icon } = defineProps<{
        href?: string
        secondary?: boolean
        icon?: 'external' | 'github'
    }>()

    const { Icon = undefined, iconAttr = undefined, iconRight = false } = icon ? ({
        github: {
            Icon: GitHub,
            iconAttr: { class: 'h-5' }
        },
        external: {
            Icon: External,
            iconAttr: { class: 'h-3' },
            iconRight: true
        }
    } as const)[icon] : {}
</script>
<template>
    <component :is="href ? 'a' : 'button'" :href :class="['leading-snug h-12 font-medium rounded-full flex items-center justify-center gap-3', $slots.default ? 'px-7' : 'aspect-square', secondary ? 'border border-current' : 'bg-black text-white dark:bg-white dark:text-black']">
        <component :is="Icon" v-bind="iconAttr" v-if="!iconRight && Icon" />
        <slot />
        <component :is="Icon" v-bind="iconAttr" v-if="iconRight && Icon" />
    </component>
</template>