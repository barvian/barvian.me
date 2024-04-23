import { url } from '@/stores/page'

export const isExternal = (href: string | URL) => {
	if (typeof href === 'string')
		return href.trim().startsWith('mailto:')
			? false
			: new URL(href, url.value?.origin).origin !== url.value?.origin

	return href.origin !== url.value?.origin
}
