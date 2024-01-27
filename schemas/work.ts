import { z, type CollectionEntry } from 'astro:content'

export const project = z.object({
  type: z.literal('project'),
  title: z.string(),
  poster: z.string(),
  video: z.string(),
  usesLightBg: z.boolean().default(false),
  usesDarkBg: z.boolean().default(false),
  for: z.string().optional(),
  repo: z.string().optional(),
  url: z.string().url().optional(),
  date: z.date(),
  using: z.array(z.string()).optional()
})

export type ProjectEntry = CollectionEntry<'works'> & { data: z.infer<typeof project> }

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

export default z.discriminatedUnion('type', [
  project,
  smashing,
  codrops 
])

