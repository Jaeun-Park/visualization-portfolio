import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			// Set the base path for GitHub Pages
			base: process.argv.includes('dev') ? '' : '/visualization-portfolio'
		},
	}
};

export default config;