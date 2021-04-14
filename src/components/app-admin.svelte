<script>
    import NavPanel from "./nav-panel.svelte";
    import List from "./list/list.svelte"
    import {settings} from "../modules/store";
    import {activeList} from "../modules/store";
	import Document from "./document/document.svelte";
	import TabBar from "./tab-bar.svelte";
    import Tab from "./tab.svelte";


	import MagicDoc from "../magic-doc";
	let activeDoc = MagicDoc.manager.active;
	let documents = MagicDoc.manager.documents;

</script>

<main>
	<NavPanel/>
	<TabBar>
		{#each $documents as doc}
			<Tab on:click={()=>$activeDoc = doc} doc={doc} selected={doc === $activeDoc} />
		{/each}
	</TabBar>

	{#each $settings.lists as list}
		<List list={list} selected={list === $activeList}/>
	{/each}

	{#each $documents as doc}
		<Document doc={doc} selected="{doc === $activeDoc}"/>
	{/each}
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: auto minmax(200px, 400px) minmax(420px, 1fr);
		grid-template-rows: 50px 1fr;
		grid-template-areas:
			"nav list tab"
			"nav list page";
		height: 100vh;
	}
</style>