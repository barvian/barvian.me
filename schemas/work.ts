import { z, reference, type CollectionEntry, type SchemaContext } from 'astro:content'

export const project = ({ image }: SchemaContext) =>
	z.object({
		type: z.literal('project'),
		title: z.string(),
		poster: image(),
		video: z.string(),
		demo: z
			.union([
				z.string(),
				z.object({
					astroComponentBasename: z.string(),
					main: z.string().optional()
				})
			])
			.optional(),
		usesLightBg: z.boolean().default(false),
		usesDarkBg: z.boolean().default(false),
		for: reference('companies').optional(),
		repo: z.string().optional(),
		url: z.string().url().optional(),
		date: z.date(),
		using: z.array(reference('tools')).optional()
	})

export type ProjectEntry = CollectionEntry<'works'> & { data: z.infer<ReturnType<typeof project>> }

export const smashing = z.object({
	type: z.literal('smashing'),
	title: z.string(),
	url: z.string().url()
})

export type SmashingEntry = CollectionEntry<'works'> & { data: z.infer<typeof smashing> }

export const codrops = z.object({
	type: z.literal('codrops'),
	title: z.string(),
	url: z.string().url()
})

export type CodropsEntry = CollectionEntry<'works'> & { data: z.infer<typeof codrops> }

export default (context: SchemaContext) =>
	z.discriminatedUnion('type', [project(context), smashing, codrops])
