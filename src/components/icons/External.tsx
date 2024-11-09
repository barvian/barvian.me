export default function External(props: JSX.IntrinsicElements['svg']) {
	return (
		<svg {...props} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M1 11L11 1"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M1 1H11V11"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}
