<script>
	import {portal} from "svelte-portal";
	export let icon = "fad fa-spinner fa-pulse"
</script>

<main use:portal={"body"}>
	<section>
		<slot/>
		{#if icon}
			<i class={"icon " + icon}></i>
		{/if}
	</section>
</main>

<style lang="scss">
	main {
		z-index: 99998;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, .3);
		backdrop-filter: blur(8px);
		color: white;
		text-align: center;
		display: flex;
		align-items: center;

		section {
			margin: 0 auto;

			i.icon {
				display: block;
				font-size: 24px;
				margin-top: 20px;
			}
		}
	}
</style>