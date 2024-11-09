import Button from '@/components/Button'
import { useMediaQuery, useClickOutside, useMounted } from '@mantine/hooks'
import { screens } from '/theme'
import * as React from 'react'
import clsx from 'clsx/lite'

export default function Header() {
	const socialRef = useClickOutside(() => setSocialExpanded(false))
	const isMounted = useMounted()
	const canHover = useMediaQuery('(hover: hover)')
	const [socialExpanded, setSocialExpanded] = React.useState(false)
	const maxXs = useMediaQuery(`not all and (min-width: ${screens.xs})`)

	return (
		<header className="container flex items-center justify-between ~py-8/16">
			<h1
				className={clsx(
					'relative w-fit text-lg/snug transition',
					socialExpanded && 'max-xs:opacity-50 max-xs:blur-sm'
				)}
			>
				<div
					role="none"
					className="invisible absolute right-full top-2 mr-3.5 size-0.5"
					style={{ viewTransitionName: 'back' }}
				/>
				<span style={{ viewTransitionName: 'name' }}>Maxwell Barvian</span>
				<br />
				<span style={{ viewTransitionName: 'title' }}>Design Engineer</span>
			</h1>
			<div className="max-xs:relative xs:contents">
				<div className="max-xs:absolute max-xs:right-0 max-xs:top-1/2 max-xs:-translate-y-1/2 xs:contents">
					<nav
						ref={socialRef}
						onMouseEnter={() => canHover && setSocialExpanded(true)}
						onMouseLeave={() => setSocialExpanded(false)}
						id="social"
						aria-label="Social links"
						className={clsx(
							'isolate flex items-center ~/sm:~gap-1/2 max-xs:*:bg-white/10 max-xs:*:backdrop-blur-lg max-xs:*:transition-all max-xs:~min-[20rem]/[22rem]:~-space-x-9/6',
							socialExpanded && 'max-xs:!space-x-0'
						)}
					>
						<Button
							className="inactive:text-current/75"
							icon="x"
							href="https://x.com/mbarvian"
							preset="tertiary"
						/>
						<Button
							className="-z-10 inactive:text-current/75"
							icon="github"
							href="https://github.com/barvian"
							preset="tertiary"
						/>
						<Button
							className="-z-20 inactive:text-current/75"
							icon="linkedin"
							href="https://linkedin.com/in/barvian"
							preset="tertiary"
						/>
						<Button
							icon="email"
							className="-z-30 inactive:text-current/75"
							href="mailto:max@barvian.me"
							preset="tertiary"
						/>
					</nav>
					{isMounted && !canHover && maxXs && !socialExpanded && (
						<button
							aria-controls="social"
							aria-label="Toggle social links"
							onClick={() => setSocialExpanded(true)}
							aria-expanded={socialExpanded}
							className="absolute inset-0 size-full"
						/>
					)}
				</div>
			</div>
		</header>
	)
}
