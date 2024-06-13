import { z, reference, type CollectionEntry, type SchemaContext } from 'astro:content'

// z.intersection messed up types for some reason
export const video = ({ image }: SchemaContext) => ({
	poster: image(),
	video: z.array(z.object({ file: z.string(), type: z.string() }))
})

type Infer<Type extends Record<string, z.ZodType>> = {
	[Property in keyof Type]: z.infer<Type[Property]>
}
export type HasVideo = CollectionEntry<'works'> & { data: Infer<ReturnType<typeof video>> }

export const project = (context: SchemaContext) =>
	z.object({
		type: z.literal('project'),
		title: z.string(),
		demo: z
			.union([
				z.string(),
				z.object({
					file: z.string(),
					main: z.string().optional()
				})
			])
			.optional(),
		for: reference('companies').optional(),
		...video(context),
		repo: z.string().optional(),
		url: z.string().url().optional(),
		date: z.date(),
		using: z.array(reference('tools')).optional()
	})

export type ProjectEntry = CollectionEntry<'works'> & { data: z.infer<ReturnType<typeof project>> }

export function isProjectEntry(entry?: CollectionEntry<'works'>): entry is ProjectEntry {
	return entry?.data.type === 'project'
}

export const article = (context: SchemaContext) =>
	z.object({
		type: z.literal('article'),
		logo: z.string(),
		logoColor: z.string().optional(),
		title: z.string(),
		url: z.string().url(),
		...video(context)
	})

export type ArticleEntry = CollectionEntry<'works'> & { data: z.infer<ReturnType<typeof article>> }

export function isArticleEntry(entry?: CollectionEntry<'works'>): entry is ArticleEntry {
	return entry?.data.type === 'article'
}

export const github = z.object({
	type: z.literal('github'),
	github: z.string()
})

export type GitHubEntry = CollectionEntry<'works'> & { data: z.infer<typeof github> }

export function isGitHubEntry(entry?: CollectionEntry<'works'>): entry is GitHubEntry {
	return entry?.data.type === 'github'
}

export default (context: SchemaContext) =>
	z.discriminatedUnion('type', [project(context), article(context), github])
