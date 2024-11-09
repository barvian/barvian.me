import { getCollection } from 'astro:content'

export const getProjectsWithDemos = async () =>
	(await getCollection('works', ({ data }) => data.type === 'project' && data.demo)).map(
		(project) => project.slug
	)
