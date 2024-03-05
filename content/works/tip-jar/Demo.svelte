<script>
	import Jar from './Jar.svelte'
	let jar

	let key = 0
	let clicked = false
	$: if (key) clicked = false
</script>

<!-- Use data attributes to avoid conflicts with Tailwind :\ -->
<!-- svelte-ignore a11y-no-static-element-interactions a11y-click-events-have-key-events -->
<div
	data-wrapper
	on:pointerdown={() => jar?.addCoin()}
	on:click={!clicked && (() => (clicked = true))}
>
	{#key key}
		<div data-jar>
			<Jar bind:this={jar} />
		</div>
	{/key}
	<div data-toolbar>
		<span data-hide={clicked ? '' : undefined}>Click anywhere to add a coin</span>
		<button
			aria-label="Reset"
			on:click|stopPropagation={clicked && (() => key++)}
			disabled={!clicked}
		>
			<svg
				fill="none"
				style="height: 1.25rem"
				shape-rendering="geometricPrecision"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				viewBox="0 0 24 24"><path d="M1 4v6h6" /><path d="M3.51 15a9 9 0 102.13-9.36L1 10" /></svg
			>
		</button>
	</div>
</div>

<style>
	/* Want these styles separate from main.css/Tailwind */
	[data-wrapper] {
		background-color: #c6c9cf;
		container-type: inline-size;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		display: grid;
		grid-template-rows: 1fr auto;
		justify-items: center;
		height: 100%;
		padding: 1.5rem;
		/* gap: 1.5rem; */
		width: 100%;
	}

	@container (width <= 31rem) {
		[data-jar] {
			scale: 80%;
		}
	}

	[data-toolbar] {
		color: black;
		opacity: 0.45;
		font-size: 0.875rem;
		margin-top: auto;
		display: grid;
		justify-items: center;
		grid-template-areas: 'overlap';
	}

	[data-toolbar] > * {
		grid-area: overlap;
	}

	span,
	button {
		transition: all 0.3s ease;
	}

	button:disabled {
		pointer-events: none;
	}

	span {
		pointer-events: none;
		user-select: none;
	}

	[data-hide],
	:disabled {
		opacity: 0;
		transform: scale(0.9);
	}

	button:not(:disabled):hover {
		opacity: 0.8;
	}

	button:not(:disabled):active {
		opacity: 1;
	}
</style>
