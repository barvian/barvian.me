import clsx from 'clsx/lite'

export default function Spinner({ className, ...rest }: JSX.IntrinsicElements['svg']) {
	return (
		<svg
			{...rest}
			className={clsx(className, 'animate-spin')}
			viewBox="0 0 28 28"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Loading</title>
			<path
				d="M14 26C20.6274 26 26 20.6274 26 14C26 7.37258 20.6274 2 14 2C7.37258 2 2 7.37258 2 14C2 20.6274 7.37258 26 14 26Z"
				strokeWidth="3"
				className="stroke-black/20"
			/>
			<path
				d="M26 14C26 7.37333 20.6267 2 14 2"
				stroke="white"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</svg>
	)
}
