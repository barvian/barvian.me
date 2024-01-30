import type { MiddlewareHandler } from "astro"
import { setCurrentUrl } from "/utils/url"

export const onRequest: MiddlewareHandler = ({ url }, next) => {
    // Expose the request URL for framework components (equivalent to Astro.url in Astro component)
    setCurrentUrl(url)

    return next()
}