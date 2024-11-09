import type { MiddlewareHandler } from 'astro'
import { $url } from '@/stores/page'

export const onRequest: MiddlewareHandler = ({ url }, next) => {
	// Expose the request URL for framework components SSR (equivalent to Astro.url in Astro component)
	$url.set(url)

	return next()
}
