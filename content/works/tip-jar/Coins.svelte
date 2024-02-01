<script>
	import { onMount, onDestroy } from 'svelte'
	import { hsla, toRgba } from 'color2k'
	import matter from 'matter-js'
	import useTransitioning from '/composables/useTransitioning'
	import { until } from '@vueuse/core'

	export let w
	export let h
	export let r
	export let c

	const coins = []

	const transitioning = useTransitioning()

	// Wait to animate until transition is complete (if applicable)
	const loadDelay = transitioning.value ? until(transitioning).toBeUndefined() : Promise.resolve()

	const engine = matter.Engine.create({
		enableSleeping: true // puts bodies to sleep when they come to rest, saves a lot on perf
	})
	const world = engine.world
	const runner = matter.Runner.create()

	let wrapper, render
	onMount(async () => {
		render = matter.Render.create({
			element: wrapper,
			engine,
			options: {
				pixelRatio: 2, // I think it might actually be better a little blurry
				width: w,
				height: h,
				showSleeping: false,
				wireframes: false,
				background: 'transparent'
			}
		})

		matter.Render.run(render)
		matter.Runner.run(runner, engine)

		// Add walls
		matter.Composite.add(world, [
			matter.Bodies.rectangle(w / 2, h + 5, w, 10, { isStatic: true, render: { visible: false } }), // bottom
			matter.Bodies.rectangle(w + 5, h / 2, 10, h, { isStatic: true, render: { visible: false } }), // right
			matter.Bodies.rectangle(-5, h / 2, 10, h, { isStatic: true, render: { visible: false } }), // left,
			// Bottom left corner
			...Array.from({ length: r }, (_, i) => {
				const theta = Math.PI + Math.asin(i / r)
				const width = r + r * Math.cos(theta)
				return matter.Bodies.rectangle(width / 2, h - r + i + 0.5, width, 1, {
					isStatic: true,
					render: { visible: false }
				})
			}),
			// Bottom right corner
			...Array.from({ length: r }, (_, i) => {
				const theta = 2 * Math.PI - Math.asin(i / r)
				const width = r - r * Math.cos(theta)
				return matter.Bodies.rectangle(w - width / 2, h - r + i + 0.5, width, 1, {
					isStatic: true,
					render: { visible: false }
				})
			})
		])

		// Increase chance of smooth initial animation
		await loadDelay

		const stack = matter.Composites.stack(w / 2 - 12, -40, 3, 4, 0, 0, (x, y) =>
			addCoin({ x, y, add: false })
		)

		matter.Composite.add(world, stack)
	})

	onDestroy(() => {
		matter.Render.stop(render)
		matter.Runner.stop(runner)
		matter.Engine.clear(engine)
	})

	export function addCoin({ x, y = -5, add = true } = {}) {
		const [size, darkenAmount] = matter.Common.choose([
			[5, 0.08],
			[6, 0.1]
		])
		const coin = matter.Bodies.circle(x ?? w / 2 - size / 2 + 1, y, size, {
			restitution: 0.75,
			render: {
				fillStyle: toRgba(hsla(c[0], c[1], c[2] - darkenAmount, 1))
			}
		})

		if (add)
			loadDelay.then(() => {
				matter.Composite.add(world, coin)
			})
		coins.push(coin)
		return coin
	}
</script>

<div data-coins style="width: min-content" bind:this={wrapper}></div>
