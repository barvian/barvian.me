<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/components/Button.vue'
import { vOnClickOutside } from '@vueuse/components'
import { screens } from '/theme'
import { useBreakpoints, useMediaQuery, useMounted } from '@vueuse/core'
const breakpoints = useBreakpoints(screens)
const canHover = useMediaQuery('(hover: hover)')

const socialExpanded = ref(false)
const maxXs = breakpoints.smaller('xs')
const isMounted = useMounted()
</script>
<template>
	<header class="container flex items-center justify-between ~py-8/16">
		<h1
			class="relative w-fit text-lg/snug transition"
			:class="{
				'max-xs:opacity-50 max-xs:blur-sm': socialExpanded
			}"
		>
			<div
				role="none"
				class="invisible absolute right-full top-2 mr-3.5 size-0.5"
				style="view-transition-name: back"
			/>
			<span style="view-transition-name: name">Maxwell Barvian</span><br />
			<span style="view-transition-name: title">UI Engineer</span>
		</h1>
		<div class="max-xs:relative xs:contents">
			<div
				class="max-xs:absolute max-xs:right-0 max-xs:top-1/2 max-xs:-translate-y-1/2 xs:contents"
			>
				<nav
					ref="social"
					@mouseenter="canHover && (socialExpanded = true)"
					@mouseleave="socialExpanded = false"
					v-on-click-outside="() => (socialExpanded = false)"
					id="social"
					aria-label="Social links"
					class="isolate flex items-center ~/sm:~gap-1/2 max-xs:*:bg-white/10 max-xs:*:backdrop-blur-lg max-xs:*:transition-all max-xs:~min-[20rem]/[22rem]:~-space-x-9/6"
					:class="{ 'max-xs:!space-x-0': socialExpanded }"
				>
					<Button
						class="inactive:text-current/75"
						icon="x"
						href="https://x.com/mbarvian"
						preset="tertiary"
					/>
					<Button
						class="-z-10 inactive:text-current/75"
						icon="github"
						href="https://github.com/barvian"
						preset="tertiary"
					/>
					<Button
						class="-z-20 inactive:text-current/75"
						icon="linkedin"
						href="https://linkedin.com/in/barvian"
						preset="tertiary"
					/>
					<Button
						icon="email"
						class="-z-30 inactive:text-current/75"
						href="mailto:max@barvian.me"
						preset="tertiary"
					/>
					<!-- <Button
						class="-z-40 inactive:text-current/75"
						icon="dribbble"
						href="https://dribbble.com/barvian"
						preset="tertiary"
					/> -->
				</nav>
				<button
					aria-controls="social"
					aria-label="Toggle social links"
					v-if="isMounted && !canHover && maxXs && !socialExpanded"
					@click="socialExpanded = true"
					:aria-expanded="socialExpanded ? 'true' : 'false'"
					class="absolute inset-0 size-full"
				/>
			</div>
		</div>
	</header>
</template>
