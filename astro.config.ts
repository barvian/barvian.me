import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import vue from '@astrojs/vue'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/serverless'

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
	markdown: {
		shikiConfig: {
			theme: 'vesper'
		}
	},
	output: 'hybrid',
	adapter: vercel({
		isr: {
			// A secret random string that you create.
			bypassToken: process.env.ISR_BYPASS_TOKEN,
			// Paths that will always be served fresh.
			exclude: ['/api/webhook']
		},
		webAnalytics: {
			enabled: true
		}
	})
})
