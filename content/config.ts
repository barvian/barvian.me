import { z, defineCollection } from 'astro:content'
import worksSchema from '/schemas/work'

const worksCollection = defineCollection({
  type: 'content',
  schema: worksSchema
})

export const collections = {
  'works': worksCollection
}