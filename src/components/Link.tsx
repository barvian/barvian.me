import clsx from 'clsx/lite'
import { isExternal } from '@/utils/url'

export default function Link({ href, className, ...rest }: JSX.IntrinsicElements['a']) {
	const external = typeof href === 'string' && isExternal(href)
	return (
		<a
			{...rest}
			rel={external ? 'external' : undefined}
			target={external ? '_blank' : undefined}
			className={clsx('cursor-external', className)}
		/>
	)
}
