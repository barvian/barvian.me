import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
import { normalize } from 'tailwindcss/src/util/dataTypes'

export default {
	content: ['./{components,pages,layouts}/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		container: {
			center: true,
			padding: '1.5rem'
		},
		extend: {
			fontFamily: {
				sans: ['Favorit', 'sans-serif']
			},
			spacing: ({ theme }) => ({
				'10vh': 'max(theme(padding.10),10vh)',
				'12vh': 'max(theme(padding.12),12vh)'
			}),
			aspectRatio: {
				golden: '1.618'
			},
			borderRadius: {
				xl: '0.625rem'
			},
			borderWidth: {
				10: '10px'
			},
			transitionTimingFunction: {
				DEFAULT: 'cubic-bezier(.165,.84,.44,1)'
			},
			transitionDuration: {
				DEFAULT: '400ms',
				450: '450ms'
			},
			backgroundImage: {
				'to-dark': 'linear-gradient(to bottom, transparent 0%, transparent 8.1%, rgba(0,0,0,0.001) 15.5%, rgba(0,0,0,0.003) 22.5%, rgba(0,0,0,0.005) 29%, rgba(0,0,0,0.008) 35.3%, rgba(0,0,0,0.011) 41.2%, rgba(0,0,0,0.014) 47.1%, rgba(0,0,0,0.016) 52.9%, rgba(0,0,0,0.019) 58.8%, rgba(0,0,0,0.022) 64.7%, rgba(0,0,0,0.025) 71%, rgba(0,0,0,0.027) 77.5%, rgba(0,0,0,0.029) 84.5%, rgba(0,0,0,0.03) 91.9%, rgba(0,0,0,0.03) 100%)',
				'to-light': 'linear-gradient(to bottom, transparent 0%, transparent 8.1%, rgba(255,255,255,0.001) 15.5%, rgba(255,255,255,0.003) 22.5%, rgba(255,255,255,0.005) 29%, rgba(255,255,255,0.008) 35.3%, rgba(255,255,255,0.011) 41.2%, rgba(255,255,255,0.014) 47.1%, rgba(255,255,255,0.016) 52.9%, rgba(255,255,255,0.019) 58.8%, rgba(255,255,255,0.022) 64.7%, rgba(255,255,255,0.025) 71%, rgba(255,255,255,0.027) 77.5%, rgba(255,255,255,0.029) 84.5%, rgba(255,255,255,0.03) 91.9%, rgba(255,255,255,0.03) 100%)'
			}
		},
	},
	plugins: [
		typography,
		plugin(({ matchVariant }) => {
			// Override built-in to handle self
			matchVariant('group-has', (value, { modifier }) => {
				const mod = modifier ? `\\/${modifier}` : ''
				const has = value ? `:has(${normalize(value)})` : ''
				return `:merge(.group${mod})${has} &`
			}, {
				values: {
					DEFAULT: null
				}
			})
		})
	]
} satisfies Config
