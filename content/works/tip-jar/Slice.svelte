<script>
	export let z = 0
	export let w = 0
	export let h = 0
	export let yR = 0
	export let d = 0
	export let el

	let zR, straightX, straightY, xTriangleHeight, xTriangleWidth, yTriangleHeight, yTriangleWidth
	$: zR = Math.min(yR, d / 2)

	/* Compute the scaleX by solving for
	 *  ____________________
	 * /|                  |\
	 * ---------------------- midline (d/2)
	 * ^     straightX (part that isn't affected by radius)
	 */
	$: straightX = w - zR * 2
	$: xTriangleHeight = Math.max(0, z - (d / 2 - zR))
	$: xTriangleWidth = Math.sqrt(zR * zR - xTriangleHeight * xTriangleHeight)

	/* scaleY is mostly the same */
	$: straightY = h - yR * 2
	$: yTriangleHeight = Math.max(0, z - (d / 2 - yR))
	$: yTriangleWidth = Math.sqrt(yR * yR - yTriangleHeight * yTriangleHeight)
</script>

<div
	role="none"
	class={$$props.class || ''}
	bind:this={el}
	style="
		--scaleX: {(straightX + xTriangleWidth * 2) / w};
		--scaleY: {(straightY + yTriangleWidth * 2) / h};
		--z: {z}px;
	"
>
	<slot />
</div>

<style>
	div {
		background-color: var(--color);
		border-radius: var(--radius);
		position: absolute;
		top: 0;
		transform: translateZ(calc(var(--depth) * 1px / -2 - var(--z)))
			scale(calc(var(--upscale) * var(--scaleX)), calc(var(--upscale) * var(--scaleY)));
		transform-origin: center;
		left: 0;
		width: 100%;
		height: 100%;

		/* scale visually undoes translateZ to keep things pixel-aligned with the rest of the page */
		--upscale: calc(1);
	}
</style>
