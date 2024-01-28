import { z, defineCollection } from 'astro:content'
import worksSchema from '/schemas/work'
import type { ImageMetadata } from 'astro'

const worksCollection = defineCollection({
  type: 'content',
  schema: worksSchema
})

const companiesCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    url: z.string().url(),
    logo: image().optional()
  })
})

const toolsCollection = defineCollection({
  type: 'data',
  schema: ({ image }) => z.object({
    name: z.string(),
    url: z.string().url(),
    logo: image().optional()
  })
})

export const collections = {
  'works': worksCollection,
  'tools': toolsCollection,
  'companies': companiesCollection
}