import { useEffect } from 'react'

export default function useEventListener<T extends EventTarget, K extends keyof WindowEventMap>(
	target: React.MutableRefObject<T | undefined>,
	eventName: K[] | K,
	listener: EventListenerOrEventListenerObject,
	options?: boolean | AddEventListenerOptions
) {
	useEffect(() => {
		if (!target.current) return
		const events = Array.isArray(eventName) ? eventName : [eventName]
		events.forEach((event) => {
			target.current?.addEventListener(event, listener, options)
		})
		return () => {
			events.forEach((event) => {
				target.current?.removeEventListener(event, listener, options)
			})
		}
	}, [target, eventName, listener, options])
}
