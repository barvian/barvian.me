import { screens as _screens } from 'tw-reset/defaultTheme'
const { '2xl': _, ...screensInRem } = _screens

// Things that need to be exported on the client

export const screens = {
	...screensInRem,
	xs: '26rem',
	md: '53.75rem'
}
