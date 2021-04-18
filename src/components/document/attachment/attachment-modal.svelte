<script lang="ts">
	import Modal from "../../../elements/modal.svelte";
	import FormDoc from "../form/doc.ts";
	import Category from "./attachment-category.svelte";

	export let close = () => console.log('close')
	export let doc: FormDoc;
	export let categories: Array<{ name: string, label: string }> = null;
	let modal: Modal;
	function reload(){categoryElements.forEach(categoryElement=>categoryElement.get())}
	let categoryElements = [];
</script>

<Modal bind:this={modal} icon="inverse far fa-folder-open" title="Attachments" big>
	<nav slot="nav">
		<button on:click={close}><i class="fas fa-times"></i></button>
	</nav>
	<main>
		{#each categories as category, i}
			<Category bind:this={categoryElements[i]} name="{category.name}" label="{category.label}" doc={doc} reload={reload}/>
		{/each}
	</main>
</Modal>

<style lang="scss">
	main {
		display: flex;
		flex-direction: column;
		min-height: 100%;
		border-bottom: 1px solid #eee;
		background-color: #f9f9f9;
	}
</style>