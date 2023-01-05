import type { LayoutLoad } from './$types';
import { PUBLIC_API_URL, PUBLIC_VERSION } from '$env/static/public';
import type { AppSettings } from 'src/models/appsettings.model';

export const prerender = true;
export const ssr = true;
export const csr = true;
export const load = (async () => {
	const appSettings: AppSettings = {
		api: PUBLIC_API_URL,
		version: PUBLIC_VERSION
	};

	return {
		appSettings
	};
}) satisfies LayoutLoad;
