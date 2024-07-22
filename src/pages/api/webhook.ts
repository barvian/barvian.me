import type { APIRoute } from 'astro'
import crypto from 'crypto'

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
	try {
		const text = await request.text()

		const signature = crypto
			.createHmac('sha256', import.meta.env.GITHUB_WEBHOOK_SECRET || '')
			.update(text)
			.digest('hex')

		const trusted = Buffer.from(`sha256=${signature}`, 'ascii')
		const untrusted = Buffer.from(request.headers.get('x-hub-signature-256') || '', 'ascii')

		if (!crypto.timingSafeEqual(trusted, untrusted)) {
			console.log('[Astro] Invalid signature.', {
				trusted: trusted.toString('hex'),
				untrusted: untrusted.toString('hex')
			})
			return new Response('Invalid signature.', {
				status: 400
			})
		}

		console.log('[Astro] Revalidating /')
		if (!import.meta.env.ISR_BYPASS_TOKEN) throw new Error('No ISR bypass token set')
		const headers = new Headers()
		headers.set('x-prerender-revalidate', import.meta.env.ISR_BYPASS_TOKEN)
		await fetch(new URL('/', request.url), {
			method: 'HEAD',
			headers
		})
	} catch (error) {
		return new Response(`Webhook error: ${(error as any)?.message}`, {
			status: 400
		})
	}

	return new Response('Success!', {
		status: 200
	})
}
