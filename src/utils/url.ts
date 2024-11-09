import { $url } from '@/stores/page'

export const isExternal = (href: string | URL) => {
	const url = $url.get()
	if (typeof href === 'string')
		return href.trim().startsWith('mailto:') ?
				false
			:	new URL(href, url?.origin).origin !== url?.origin

	return href.origin !== url?.origin
}
