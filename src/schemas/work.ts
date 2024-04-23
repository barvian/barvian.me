import { z, reference, type CollectionEntry, type SchemaContext } from 'astro:content'

export const project = ({ image }: SchemaContext) =>
	z.object({
		type: z.literal('project'),
		title: z.string(),
		poster: image(),
		video: z.record(z.string(), z.string()),
		demo: z
			.union([
				z.string(),
				z.object({
					astroComponentBasename: z.string(),
					main: z.string().optional()
				})
			])
			.optional(),
		for: reference('companies').optional(),
		repo: z.string().optional(),
		url: z.string().url().optional(),
		date: z.date(),
		using: z.array(reference('tools')).optional()
	})

export type ProjectEntry = CollectionEntry<'works'> & { data: z.infer<ReturnType<typeof project>> }

export function isProjectEntry(entry?: CollectionEntry<'works'>): entry is ProjectEntry {
	return entry?.data.type === 'project'
}

export const smashing = z.object({
	type: z.literal('smashing'),
	title: z.string(),
	url: z.string().url()
})

export type SmashingEntry = CollectionEntry<'works'> & { data: z.infer<typeof smashing> }

export function isSmashingEntry(entry?: CollectionEntry<'works'>): entry is SmashingEntry {
	return entry?.data.type === 'smashing'
}

export const codrops = z.object({
	type: z.literal('codrops'),
	title: z.string(),
	url: z.string().url()
})

export type CodropsEntry = CollectionEntry<'works'> & { data: z.infer<typeof codrops> }

export function isCodropsEntry(entry?: CollectionEntry<'works'>): entry is CodropsEntry {
	return entry?.data.type === 'codrops'
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
	z.discriminatedUnion('type', [project(context), smashing, codrops, github])
