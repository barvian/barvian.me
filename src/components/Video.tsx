import clsx from 'clsx/lite'
import type { ImageMetadata } from 'astro'
import { useInViewport } from '@mantine/hooks'
import { $transitioning } from '@/stores/page'
import { useStore } from '@nanostores/react'
import Spinner from '@/components/Spinner'
import { useEffect, useRef, useState } from 'react'

export default function Video({
	className,
	forcePlay = false,
	spinner = true,
	src,
	muted = true,
	loop = true,
	autoPlay = true,
	playsInline = true,
	poster,
	position = 'relative',
	...props
}: Omit<JSX.IntrinsicElements['video'], 'src' | 'poster'> & {
	forcePlay?: boolean
	spinner?: boolean
	src: Array<{ file: string; type: string }>
	poster: ImageMetadata
	position?: string
}) {
	const { ref, inViewport } = useInViewport<HTMLDivElement>()
	const video = useRef<HTMLVideoElement>(null)
	const transitioning = useStore($transitioning)
	const [waiting, setWaiting] = useState(false)
	useEffect(() => {
		if (!video.current) return
		let waitingTimeout: NodeJS.Timeout
		const onVideoWaiting = () => {
			if (waitingTimeout) clearTimeout(waitingTimeout)
			waitingTimeout = setTimeout(() => setWaiting(true), 100)
		}
		const onVideoPlaying = () => {
			if (waitingTimeout) clearTimeout(waitingTimeout)
			setWaiting(false)
		}
		video.current.addEventListener('waiting', onVideoWaiting)
		video.current.addEventListener('loadstart', onVideoWaiting)
		video.current.addEventListener('playing', onVideoPlaying)
		video.current.addEventListener('loadeddata', onVideoPlaying)
		return () => {
			if (waitingTimeout) clearTimeout(waitingTimeout)
			if (!video.current) return
			video.current.removeEventListener('waiting', onVideoWaiting)
			video.current.removeEventListener('loadstart', onVideoWaiting)
			video.current.removeEventListener('playing', onVideoPlaying)
			video.current.removeEventListener('loadeddata', onVideoPlaying)
		}
	})
	return (
		<div
			ref={ref}
			className={clsx(className, position)}
			style={{ aspectRatio: poster.width / poster.height }}
		>
			{forcePlay || (!transitioning && inViewport) ?
				<video
					{...props}
					ref={video}
					poster={poster.src}
					muted={muted}
					loop={loop}
					playsInline={playsInline}
					autoPlay={autoPlay}
					className="size-full object-cover object-top"
				>
					{src.map(({ file, type }) => (
						<source src={file} key={file} type={`video/${type}`} />
					))}
				</video>
			:	<img src={poster.src} alt="" className="size-full object-cover object-top" />}
			{spinner && waiting && !transitioning && (
				<Spinner className="absolute bottom-4 left-4 size-7" />
			)}
			<slot />
		</div>
	)
}
