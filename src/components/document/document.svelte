<script lang="ts">
	import Doc from "./doc";
	export let doc: Doc;
    export let selected;
</script>

<main class:selected>
	<svelte:component this={doc.component} doc={doc}/>
</main>

<style lang="scss">
	main {
		display: none;
		&.selected {display: block}
		grid-area: page;
		background: linear-gradient(180deg, #000, #000 50px, #0000 200px);
		color: white;
		overflow: auto;
	}
</style>