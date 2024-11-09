import { defineConfig } from 'astro/config'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import mdx from '@astrojs/mdx'
import vercel from '@astrojs/vercel/serverless'
import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
	integrations: [
		tailwind({
			nesting: true,
			applyBaseStyles: false
		}),
		svelte(),
		mdx(),
		react()
	],
	vite: {
		esbuild: {
			jsx: 'automatic'
		}
	},
	output: 'hybrid',
	adapter: vercel({
		isr: {
			// A secret random string that you create.
			bypassToken: process.env.ISR_BYPASS_TOKEN!,
			// Paths that will always be served fresh.
			exclude: ['/api/webhook']
		},
		webAnalytics: {
			enabled: true
		}
	})
})
