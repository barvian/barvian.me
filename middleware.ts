import type { MiddlewareHandler } from 'astro'
import { url as urlRef } from '/stores/page'

export const onRequest: MiddlewareHandler = ({ url }, next) => {
	// Expose the request URL for framework components SSR (equivalent to Astro.url in Astro component)
	urlRef.value = url

	return next()
}
