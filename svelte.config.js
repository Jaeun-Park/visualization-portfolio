import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			// base: process.argv.includes('dev') ? '' : process.env.BASE_PATH

			// Set the base path for GitHub Pages
			base: process.argv.includes('dev') ? '' : '/visualization-portfolio'
		}
	}
};

export default config;