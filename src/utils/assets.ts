import type { HasVideo } from '@/schemas/work'
import { getImage } from 'astro:assets'
import * as path from 'node:path'

const unknownTypeError = () => {
	throw new Error('Unknown video type')
}

export const getVideo = async ({ collection, id, data }: HasVideo) => {
	// Optimize the image
	const image = await getImage({ src: data.poster })
	// TODO: this feels a little gross:
	const poster = { ...data.poster, src: image.src }

	// Rules for analyzable dynamic imports: https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations
	const src = await Promise.all(
		data.video.map(async ({ file, type }) => ({
			type,
			file:
				type === 'webm' ?
					((await import(`../content/${collection}/${path.dirname(id)}/${file}.webm`))
						.default as string)
				: type === 'mp4' ?
					((await import(`../content/${collection}/${path.dirname(id)}/${file}.mp4`))
						.default as string)
				:	unknownTypeError()
		}))
	)

	return { poster, src }
}
