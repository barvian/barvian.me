<script>
  import Slice from './Slice.svelte'
  import Coins from './Coins.svelte'
  import { parseToHsla } from 'color2k'

  export let radius = '60rem'
  export let color = '#fff' // TODO: strip alpha from this because it'll mess with back elements
  export let label = 'Donate'
  export let labelFontFamily = "sans-serif"
  export let labelFontWeight = 600
  export let labelFontSize = '1.125rem'
  export let labelColor = '#000'
  export let labelLetterSpacing = 0
  export let labelTextTransform = 'none'
  
  let jar, coins, base
  export const addCoin = (...args) => coins?.addCoin(...args)

  let w, h, r, c, d
  $: if (base) { // compute actual radius in px
    const radiusPx = getComputedStyle(base).getPropertyValue('border-radius')
    const int = parseInt(radiusPx, 10)
    r = h ? Math.min(h / 2, int) : int
  }
  $: if (base) {
     // in case they passed in a variable:
    const computed = getComputedStyle(base).getPropertyValue('background-color')
    c = parseToHsla(computed)
  }
  $: d = h

  let wrapper
</script>

<div data-wrapper bind:this={wrapper} style="
  --height: {h};
  --width: {w};
  --radius: {r != null ? `${r}px` : radius};
  --color-hue: {c ? c[0] : 0};
  --color-saturation: {c ? c[1]*100 : 0}%;
  --color-lightness: {c ? c[2]*100 : 0}%;
">
  <button data-jar
    bind:clientWidth={w} bind:clientHeight={h}
    bind:this={jar}
    style="
      --color: {color};
      --depth: {d};
      --label-color: {labelColor};
      --label-font-family: {labelFontFamily};
      --label-font-weight: {labelFontWeight};
      --label-font-size: {labelFontSize};
      --label-letter-spacing: {labelLetterSpacing};
      --label-text-transform: {labelTextTransform};
      --hole-space: {w ? w - r*2 + 10: 0};
    "
  >
    <div class="tipjar-slice-shadow" />
    {#if d}
      {#each Array(Math.floor(d / 2 / 2)) as _, i}
        <Slice class={i === 0 ? 'tipjar-slice-shadow' : ''} r={r} {w} {h} {d} z={d/2 - i*2} />
      {/each}
    {/if}
    <Slice {r} {w} {h} {d} class="tipjar-slice-base" bind:el={base}>
      {#if w && h && c && jar && r != null}
        <Coins {w} {h} {r} {c} bind:this={coins} />
      {/if}
    </Slice>
    <span>{label}</span>
    {#if jar}<div role="none" data-opening />{/if}
  </button>
</div>

<style>
  [data-wrapper] {
    position: relative; /* todo: param for this; */
    perspective: calc(var(--perspective) * 1px);
    width: min-content;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    --color: hsl(var(--color-hue), var(--color-saturation), var(--color-lightness));
    --perspective: 800;
    --transition-duration: 250ms;
    --transition-timing-function: /*cubic-bezier(0.33, 1, 0.68, 1)*/ease-out;
  }

    [data-wrapper] :global(*), [data-wrapper] :global(*::before), [data-wrapper] :global(*::after) {
      box-sizing: border-box;
      padding: 0;
      margin: 0;
    }

    [data-wrapper] :global([hidden]) {
      display: none !important;
    }

  [data-jar] {
    align-items: center;
    display: flex;
    justify-content: center;
    color: var(--label-color);
    font-size: var(--label-font-size);
    font-weight: var(--label-font-weight);
    font-family: var(--label-font-family);
    letter-spacing: var(--label-letter-spacing);
    line-height: 1;
    min-width: calc(var(--height, 0) * 1.1px);
    padding: 1.5em 1.25em;
    text-shadow: 0 1px 1px var(--color);
    text-transform: var(--label-text-transform);
    transform-origin: 50% 300%;
    transform-style: preserve-3d;
    transition-property: filter, transform;
    transition-duration: var(--transition-duration);
    transition-timing-function: var(--transition-timing-function);
    /*width: 76px;*/
    /*height: 66px;*/
    will-change: transform;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;

    --open-transform: rotateX(-15deg);
    --hole: clamp(16, var(--hole-space), 24);
  }

    @media (hover: hover) {
      [data-jar]:hover {
        transform: var(--open-transform);
      }

        [data-jar]:hover :global(.tipjar-slice-base) {
          --shade-size: var(--open-shade-size);
        }

      [data-jar]:active {
        transform: var(--open-transform) translateY(2px);
        transition-duration: 50ms;
      }
    }

  [data-jar] :global(.tipjar-slice-shadow) {
    /*
     * Layer for more realistic effect
     * See:  https://tobiasahlin.com/blog/layered-smooth-box-shadows/
     * Spread should offset the translateZ
     */
    box-shadow: 
      0 2px 6px 0px hsla(var(--hsl), 0.03),
      0 4px 12px -2px hsla(var(--hsl), 0.03),
      0 8px 20px -2px hsla(var(--hsl), 0.03)
    ;
    --hsl: var(--color-hue, 0), var(--color-saturation, 0%), 15%;
  }

  [data-jar] :global(.tipjar-slice-base) {
    --shade-size: 0px;
    --open-shade-size: clamp(7px, var(--radius), 12px);
  } 

    /* Border to maintain contrast despite coins and a gradient shade to help open state */
    [data-jar] :global(.tipjar-slice-base)::after {
      box-shadow:
        inset 0 var(--shade-size) var(--shade-size) calc(-1*var(--shade-size)) var(--color),
        inset 0 var(--shade-size) var(--shade-size) calc(-1*var(--shade-size)) var(--color),
        inset 0 var(--shade-size) var(--shade-size) calc(-1*var(--shade-size)) var(--color),
        inset 0 var(--shade-size) var(--shade-size) calc(-1*var(--shade-size)) var(--color),
        inset 0 var(--shade-size) var(--shade-size) calc(-1*var(--shade-size)) var(--color),
        inset 0 0 0/*3px TODO turn this on via glassiness*/ 1px var(--color)
      ;
      border-radius: var(--radius);
      content: '';
      opacity: 0.8;
      position: absolute;
      transition: box-shadow var(--transition-duration) var(--transition-timing-function);
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
    }

  [data-jar] :global([data-coins]) {
    /* Does a better job than overflow: hidden with border-radius */
    clip-path: inset(0 0 0 0 round var(--radius));
  }

  span {
    position: relative;
  }

  [data-opening] {
    position: absolute;
    background: linear-gradient(to bottom, hsl(var(--color-hue), var(--color-saturation), calc(var(--color-lightness) - 12%)), hsl(var(--color-hue), var(--color-saturation), calc(var(--color-lightness) - 20%)));
    border-radius: 100%;
    opacity: 0.5;
    box-shadow: 0 1px 1px rgba(255, 255, 255, 0.15);
    /*
     * Scale helps the transition in case the hole is bigger than what's visually allowed,
     * translateY keeps it out of the way from the base and back planes (lowest number that works)
     */
    transform: translate3d(-50%, calc(-50% - 1px), calc(var(--depth)*1px / -2)) rotateX(90deg) scaleX(clamp(0.1, var(--hole-space) / var(--hole), 1));
    backface-visibility: hidden;
    left: 50%;
    top: 0;
    width: calc(var(--hole)*1px);
    height: calc(var(--hole)*1px);
  }
</style>