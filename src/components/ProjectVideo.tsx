import type { ProjectEntry } from '@/schemas/work'
import { useStore } from '@nanostores/react'
import Video from '@/components/Video'
import { $transitioning } from '@/stores/page'

export default function ProjectVideo({
	slug,
	src,
	poster
}: {
	slug: ProjectEntry['slug']
	src: ProjectEntry['data']['video']
	poster: ImageMetadata
}) {
	const transitioning = useStore($transitioning)
	const hasDemo = !import.meta.env.SSR && window.__PROJECTS_WITH_DEMOS__.includes(slug)
	return (
		<Video
			className="!aspect-golden w-full overflow-clip rounded-2.5cqw transition duration-200 ease-out-quad group-hover/card:scale-[1.025] group-hover/card:shadow-2xl group-focus-visible/card:outline group-active/card:scale-[1] group-active/card:shadow-none group-data-[project=active]/card:scale-[1] group-data-[project=active]/card:shadow-none group-data-[project=active]/card:[view-transition-name:project-hero] group-has/hero:[view-transition-name:project-hero] dark:!shadow-none"
			forcePlay={
				(transitioning?.from.pathname === '/' + slug && !hasDemo) ||
				transitioning?.to.pathname === '/' + slug
			}
			src={src}
			poster={poster}
		>
			<div className="ring-contrast absolute inset-0 rounded-2.5cqw" />
		</Video>
	)
}
