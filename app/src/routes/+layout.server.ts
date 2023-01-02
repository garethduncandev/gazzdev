import type { LayoutLoad } from './$types';
import { PUBLIC_API_URL, PUBLIC_VERSION } from '$env/static/public';

export const prerender = true;
export const ssr = true;
export const csr = true;
export const load = (async () => {
	const appSettings = {
		api: PUBLIC_API_URL,
		version: PUBLIC_VERSION
	};

	return {
		appSettings
	};
}) satisfies LayoutLoad;
