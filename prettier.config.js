/** @type {import('prettier').Config} */
export default {
	useTabs: true,
	singleQuote: true,
	semi: false,
	trailingComma: 'none',
	printWidth: 100,
	plugins: ['prettier-plugin-astro', 'prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro'
			}
		},
		{
			files: '*.svelte',
			options: {
				parser: 'svelte'
			}
		}
	]
}
