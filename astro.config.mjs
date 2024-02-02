import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/static'

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			nesting: true,
			applyBaseStyles: false
		}),
		svelte(),
		vue({
			script: {
				propsDestructure: true
			}
		}),
		mdx()
	],
	srcDir: './',
	output: 'static',
	adapter: vercel({
		webAnalytics: {
			enabled: true
		}
	})
})
