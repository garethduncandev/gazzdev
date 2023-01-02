<script lang="ts">
	import type { LayoutData } from './$types';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import type { AppSettings } from 'src/models/appsettings';
	export let data: LayoutData;

	let appsettings = data['appSettings'] as AppSettings;
	const version = appsettings.version;
</script>

<Header {version} />

<svelte:head>
	<title>gazzdev</title>
</svelte:head>

<main>
	<slot />
</main>

<Footer {version} />

<style lang="scss">
	@use '../styles/global.scss';
</style>
