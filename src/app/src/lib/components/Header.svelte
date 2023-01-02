<script lang="ts">
	export let version: string;
</script>

<header>
	<nav>
		<ul>
			<li><a href="/" title={version}>gazzdev</a></li>
			<li><a href="/blog">blog</a></li>
		</ul>
	</nav>
</header>

<style lang="scss">
	@use '../../styles/global.scss';
	ul {
		padding: 0;
		margin: 0;
		li {
			display: inline;
		}
	}
</style>
