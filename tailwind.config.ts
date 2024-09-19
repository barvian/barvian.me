import { type Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import typography from '@tailwindcss/typography'
import { normalize } from 'tailwindcss/src/util/dataTypes'
import defaultTheme from 'tailwindcss/defaultTheme'
import reset from 'tw-reset'
import { screens } from './theme'
import fluid, { extract, type FluidThemeConfig } from 'fluid-tailwind'

export default {
	presets: [reset],
	content: {
		files: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
		extract
	},
	theme: {
		container: () => {
			const { xs, ...screensWithoutXs } = screens

			return {
				center: true,
				screens: screensWithoutXs
			}
		},
		screens,
		transitionDuration: {
			DEFAULT: '170ms',
			'200': '200ms'
		},
		extend: {
			fontFamily: {
				sans: [
					`'Favorit', ${defaultTheme.fontFamily.sans.join(', ')}`,
					{
						fontFeatureSettings: "'ss11', 'ss04'"
					}
				]
			},
			aspectRatio: {
				golden: '1.618'
			},
			borderRadius: {
				'2.5cqw': '2.5cqw'
			},
			colors: {
				neutral: {
					200: '#e6e6e6'
				}
			},
			spacing: {
				'2.5cqw': '2.5cqw'
			},
			boxShadow: {
				'2xl': '0px 18px 36px -18px rgba(0,0,0,0.1),0px 30px 45px -30px rgba(50,50,93,0.25)'
				// '2xl': '0 40px 30px -15px rgba(0,0,0,.25)'
			},
			borderWidth: {
				10: '10px'
			},
			cursor: {
				external: `url("data:image/svg+xml,%3Csvg width='17' height='17' viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg filter='url(%23filter0_d_1068_46)'%3E%3Cmask id='path-1-outside-1_1068_46' maskUnits='userSpaceOnUse' x='1' y='0.25' width='15' height='15' fill='black'%3E%3Crect fill='white' x='1' y='0.25' width='15' height='15'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.4431 1.71291C14.4065 1.62445 14.3522 1.54158 14.2803 1.46967C14.1339 1.32322 13.9419 1.25 13.75 1.25H2.75C2.33579 1.25 2 1.58579 2 2C2 2.41421 2.33579 2.75 2.75 2.75H11.9393L2.21967 12.4697C1.92678 12.7626 1.92678 13.2374 2.21967 13.5303C2.51256 13.8232 2.98744 13.8232 3.28033 13.5303L13 3.81066V13C13 13.4142 13.3358 13.75 13.75 13.75C14.1642 13.75 14.5 13.4142 14.5 13V2C14.5 1.89831 14.4798 1.80134 14.4431 1.71291Z'/%3E%3C/mask%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M14.4431 1.71291C14.4065 1.62445 14.3522 1.54158 14.2803 1.46967C14.1339 1.32322 13.9419 1.25 13.75 1.25H2.75C2.33579 1.25 2 1.58579 2 2C2 2.41421 2.33579 2.75 2.75 2.75H11.9393L2.21967 12.4697C1.92678 12.7626 1.92678 13.2374 2.21967 13.5303C2.51256 13.8232 2.98744 13.8232 3.28033 13.5303L13 3.81066V13C13 13.4142 13.3358 13.75 13.75 13.75C14.1642 13.75 14.5 13.4142 14.5 13V2C14.5 1.89831 14.4798 1.80134 14.4431 1.71291Z' fill='black'/%3E%3Cpath d='M14.2803 1.46967L14.9874 0.762565L14.9874 0.762564L14.2803 1.46967ZM14.4431 1.71291L13.5191 2.09523L13.5194 2.09596L14.4431 1.71291ZM11.9393 2.75L12.6464 3.45711C12.9324 3.17111 13.018 2.74099 12.8632 2.36732C12.7084 1.99364 12.3438 1.75 11.9393 1.75V2.75ZM2.21967 12.4697L1.51256 11.7626L1.51256 11.7626L2.21967 12.4697ZM2.21967 13.5303L1.51256 14.2374L1.51256 14.2374L2.21967 13.5303ZM3.28033 13.5303L3.98744 14.2374L3.98744 14.2374L3.28033 13.5303ZM13 3.81066H14C14 3.4062 13.7564 3.04156 13.3827 2.88678C13.009 2.732 12.5789 2.81756 12.2929 3.10355L13 3.81066ZM13.5732 2.17678C13.5506 2.15411 13.5318 2.1261 13.5191 2.09523L15.3671 1.33059C15.2811 1.1228 15.1539 0.929045 14.9874 0.762565L13.5732 2.17678ZM13.75 2.25C13.6876 2.25 13.6218 2.2254 13.5732 2.17678L14.9874 0.762564C14.6459 0.421049 14.1963 0.25 13.75 0.25V2.25ZM2.75 2.25H13.75V0.25H2.75V2.25ZM3 2C3 2.13807 2.88807 2.25 2.75 2.25V0.25C1.7835 0.25 1 1.0335 1 2H3ZM2.75 1.75C2.88807 1.75 3 1.86193 3 2H1C1 2.9665 1.7835 3.75 2.75 3.75V1.75ZM11.9393 1.75H2.75V3.75H11.9393V1.75ZM2.92678 13.1768L12.6464 3.45711L11.2322 2.04289L1.51256 11.7626L2.92678 13.1768ZM2.92678 12.8232C3.02441 12.9209 3.02441 13.0791 2.92678 13.1768L1.51256 11.7626C0.829146 12.446 0.829146 13.554 1.51256 14.2374L2.92678 12.8232ZM2.57322 12.8232C2.67086 12.7256 2.82914 12.7256 2.92678 12.8232L1.51256 14.2374C2.19598 14.9209 3.30402 14.9209 3.98744 14.2374L2.57322 12.8232ZM12.2929 3.10355L2.57322 12.8232L3.98744 14.2374L13.7071 4.51777L12.2929 3.10355ZM14 13V3.81066H12V13H14ZM13.75 12.75C13.8881 12.75 14 12.8619 14 13H12C12 13.9665 12.7835 14.75 13.75 14.75V12.75ZM13.5 13C13.5 12.8619 13.6119 12.75 13.75 12.75V14.75C14.7165 14.75 15.5 13.9665 15.5 13H13.5ZM13.5 2V13H15.5V2H13.5ZM13.5194 2.09596C13.5066 2.0651 13.5 2.03205 13.5 2H15.5C15.5 1.76456 15.453 1.53759 15.3668 1.32986L13.5194 2.09596Z' fill='white' mask='url(%23path-1-outside-1_1068_46)'/%3E%3C/g%3E%3Cdefs%3E%3Cfilter id='filter0_d_1068_46' x='0' y='0.25' width='16.5' height='16.5' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeFlood flood-opacity='0' result='BackgroundImageFix'/%3E%3CfeColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' result='hardAlpha'/%3E%3CfeOffset dy='1'/%3E%3CfeGaussianBlur stdDeviation='0.5'/%3E%3CfeComposite in2='hardAlpha' operator='out'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0'/%3E%3CfeBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1068_46'/%3E%3CfeBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1068_46' result='shape'/%3E%3C/filter%3E%3C/defs%3E%3C/svg%3E%0A") 15 2, pointer`
			},
			rotate: {
				'225': '225deg'
			},
			transitionTimingFunction: {
				'out-quad': 'cubic-bezier(.25, .46, .45, .94)'
			},
			maxWidth: {
				prose: '43rem' // the default 65ch seemingly waits for the font-face to load, which causes a FOUC
			},
			backgroundImage: {
				'to-dark':
					'linear-gradient(to bottom,transparent,rgba(0,0,0,.7) 50%,rgba(0,0,0,0.9) 75%,rgba(0,0,0,0.9))'
			},
			typography: {
				DEFAULT: {
					css: {
						'.Tweet': {
							'margin-top': '1.777em',
							'margin-bottom': '1.777em'
						}
					}
				}
			}
		}
	},
	plugins: [
		fluid,
		typography,
		plugin(({ matchVariant, addVariant, matchUtilities, theme }) => {
			matchUtilities(
				{
					'text-current': (_, { modifier }) =>
						modifier && {
							color: `color-mix(in srgb, currentColor, transparent ${(1 - modifier) * 100}%)`
						},
					'decoration-current': (_, { modifier }) =>
						modifier && {
							'text-decoration-color': `color-mix(in srgb, currentColor, transparent ${(1 - modifier) * 100}%)`
						}
				},
				{ values: { DEFAULT: '' }, modifiers: theme('opacity') }
			)

			addVariant('inactive', '&:not(:hover,:active,:focus-visible)')
			addVariant('real-hover', '@media (hover: hover) and (pointer:fine)')

			// Override built-in to handle self
			matchVariant(
				'group-has',
				(value, { modifier }) => {
					const mod = modifier ? `\\/${modifier}` : ''
					const has = value ? `:has(${normalize(value)})` : ''
					return `:merge(.group${mod})${has} &`
				},
				{
					values: {
						DEFAULT: null
					}
				}
			)
		})
	]
} satisfies Config
