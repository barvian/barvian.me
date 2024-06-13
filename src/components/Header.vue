<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import { vOnClickOutside } from '@vueuse/components'
import { breakpointsTailwind, useBreakpoints, useMediaQuery, useMounted } from '@vueuse/core'
const breakpoints = useBreakpoints(breakpointsTailwind)
const canHover = useMediaQuery('(hover: hover)')

const socialExpanded = ref(false)
const maxSm = breakpoints.smaller('sm')
const isMounted = useMounted()
</script>
<template>
	<header class="container flex items-center justify-between py-8vh">
		<h1
			class="relative w-fit text-lg/snug transition"
			:class="{
				'max-sm:opacity-50 max-sm:blur-sm': socialExpanded
			}"
		>
			<div
				role="none"
				class="invisible absolute right-full top-2 mr-3.5 size-0.5"
				style="view-transition-name: back"
			/>
			<span style="view-transition-name: name">Maxwell Barvian</span><br />
			<span style="view-transition-name: title">Front-end Developer</span>
		</h1>
		<div class="max-sm:relative sm:contents">
			<div
				class="max-sm:absolute max-sm:right-0 max-sm:top-1/2 max-sm:-translate-y-1/2 sm:contents"
			>
				<nav
					ref="social"
					@mouseenter="canHover && (socialExpanded = true)"
					@mouseleave="socialExpanded = false"
					v-on-click-outside="() => (socialExpanded = false)"
					id="social"
					aria-label="Social links"
					class="max-[400px]:-space-x-11 isolate flex items-center gap-2 max-sm:-space-x-8 max-sm:*:bg-white/10 max-sm:*:backdrop-blur-lg max-sm:*:transition-all sm:gap-4"
					:class="{ 'max-sm:!space-x-0': socialExpanded }"
				>
					<Button
						icon="email"
						class="sm:opacity-80 sm:hover:opacity-100"
						href="mailto:max@barvian.me"
						preset="tertiary"
					/>
					<Button
						class="-z-10 sm:opacity-80 sm:hover:opacity-100"
						icon="github"
						href="https://github.com/barvian"
						preset="tertiary"
					/>
					<Button
						class="-z-20 sm:opacity-80 sm:hover:opacity-100"
						icon="x"
						href="https://x.com/mbarvian"
						preset="tertiary"
					/>
					<Button
						class="-z-30 sm:opacity-80 sm:hover:opacity-100"
						icon="linkedin"
						href="https://linkedin.com/in/barvian"
						preset="tertiary"
					/>
					<Button
						class="-z-40 sm:opacity-80 sm:hover:opacity-100"
						icon="dribbble"
						href="https://dribbble.com/barvian"
						preset="tertiary"
					/>
				</nav>
				<button
					aria-controls="social"
					aria-label="Toggle social links"
					v-if="isMounted && !canHover && maxSm && !socialExpanded"
					@click="socialExpanded = true"
					:aria-expanded="socialExpanded ? 'true' : 'false'"
					class="absolute inset-0 size-full"
				/>
			</div>
		</div>
	</header>
</template>
