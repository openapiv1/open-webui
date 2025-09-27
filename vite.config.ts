import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	define: {
		APP_VERSION: JSON.stringify('0.6.26-demo'),
		APP_BUILD_HASH: JSON.stringify('demo-build')
	},
	build: {
		sourcemap: false
	}
});
