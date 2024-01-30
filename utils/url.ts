let currentUrl: URL
export const getCurrentUrl = () => typeof window === 'undefined' ? currentUrl : location
export const setCurrentUrl = (url: URL) => currentUrl = url

export const isExternal = (href: string) => {
    if (href.trim().startsWith('mailto:')) return false
    const url = getCurrentUrl()
    return new URL(href, url.origin).origin !== url.origin
}
