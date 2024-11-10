import External from '@/components/icons/External'
import GitHub from './icons/GitHub'
import X from './icons/X'
import Dribbble from './icons/Dribbble'
import Email from './icons/Email'
import LinkedIn from './icons/LinkedIn'
import { isExternal } from '@/utils/url'
import clsx from 'clsx'

const ICONS = {
	github: {
		Left: <GitHub className="h-5" />
	},
	x: {
		Left: <X className="h-4" />
	},
	linkedin: {
		Left: <LinkedIn className="h-5" />
	},
	email: {
		Left: <Email className="h-4" />
	},
	dribbble: {
		Left: <Dribbble className="h-5" />
	},
	external: {
		Right: <External className="h-3" />
	}
} as const

type Icon = keyof typeof ICONS

type Props = (JSX.IntrinsicElements['button'] | JSX.IntrinsicElements['a']) & {
	preset?: 'primary' | 'secondary' | 'tertiary'
	size?: 'sm' | 'md'
	icon?: Icon
}

export default function Button({
	className: _cls,
	preset = 'primary',
	size = 'md',
	children,
	icon,
	ref,
	...rest
}: Props) {
	const href = 'href' in rest ? rest.href : undefined
	const external = href && isExternal(href)
	const Icons = icon && ICONS[icon]

	const nodes = (
		<>
			{Icons && 'Left' in Icons && Icons.Left}
			{children}
			{Icons && 'Right' in Icons && Icons.Right}
		</>
	)

	const className = clsx(
		_cls,
		size === 'md' ? 'h-12' : 'h-8',
		'group relative isolate flex select-none items-center justify-center gap-3 overflow-clip rounded-full leading-snug transition ease-out-quad *:pointer-events-none',
		external && icon !== 'external' && 'cursor-external',
		children ?
			size === 'md' ?
				'px-7'
			:	'px-2.5 text-sm'
		:	'aspect-square',
		preset === 'primary' ?
			'bg-black font-medium text-white hover:bg-neutral-800 dark:bg-neutral-200 dark:text-black dark:hover:bg-white'
		:	['hover:bg-black/5 dark:hover:bg-white/10', preset === 'secondary' && 'ring-contrastier']
	)

	if ('href' in rest) {
		return (
			<a
				{...rest}
				className={className}
				href={href}
				rel={external ? 'external' : undefined}
				target={external ? '_blank' : undefined}
			>
				{nodes}
			</a>
		)
	}

	return (
		// @ts-expect-error weird type prop error
		<button {...rest} className={className}>
			{nodes}
		</button>
	)
}
