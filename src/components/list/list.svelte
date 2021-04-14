<script lang="ts">
    import {writable} from "svelte/store";
	import List from "./list";

    export let selected:boolean = false;
    export let list:List;
    const listStore = writable(list);
    list.reload = () => loadData();

    $: (() => { if (selected && !list.initialised) loadData();})();

    let searchTimer:number;
    function search(){
		clearTimeout(searchTimer);
		searchTimer = setTimeout(loadData, 250);
	}

    let pageTimer:number;
    function setPage() {
        if ($listStore.page === '') return;
        $listStore.page = isNaN($listStore.page) ? 1 : $listStore.page;
        if ($listStore.page < 1) $listStore.page = 1;
        clearTimeout(pageTimer);
        pageTimer = setTimeout(loadData, 250);
    }

    function loadData() { return list.loadData().then(() => $listStore = list); }
</script>

<main class:selected>

	<header>
		<section class="info">
			<i class="icon {list.config.icon}"></i>
			<span class="title">
				<div class="label">{list.config.label}</div>
				<div class="count">{$listStore.count}</div>
			</span>
			<div class="buttons">
				{#if list.config.actions}
					{#each list.config.actions as action}
						<button title={action.label} on:click|stopPropagation={()=>action.onClick(list)}><i class={action.icon}></i></button>
					{/each}
				{/if}
			</div>
		</section>
		<section class="tools search">
			<input type="text" placeholder="search" bind:value={list.quickSearch} on:input={search}/>
		</section>
		<section class="tools paging">
			<button on:click={()=>{$listStore.page--;setPage();}}><i class="fas fa-chevron-left"></i></button>
			<input type="text" bind:value="{$listStore.page}" on:input={setPage}/> <span class="of">{$listStore.pageCount} </span>
			<button on:click={()=>{$listStore.page++;setPage();}}><i class="fas fa-chevron-right"></i></button>
			<select bind:value={list.sortingIndex} on:input={loadData}>
				{#each list.config.sorting as sorting, index}
					<option value={index}> {(sorting.order === 'asc' ? "▼ " : "▲ ") + sorting.label}</option>
				{/each}
			</select>
		</section>
	</header>
	<section class="listing">
		{#each $listStore.items as item}
			<svelte:component this={list.config.card} item={item} list={$listStore}/>
		{/each}
	</section>
</main>

<style lang="scss">

	@import "../../style/vars";
	@import "../../style/mixins";



	main {
		display: none;
		&.selected { display: block}

		grid-area: list;
		height: 100vh;
		overflow-y: auto;
		box-shadow: 10px 0px 15px $list--shadow;
		background-color: $list--background;
		> header {
			position: sticky;
			z-index: 1000;
			top: 0;
			background-color: $list--header-background;
			backdrop-filter: blur(5px);
			box-shadow: 0 16px 11px -14px $list--header-shadow;
			.info {
				color: white;
				background-color: $list--header-info-background;
				padding: 0 10px 0 0;
				display: flex;
				align-items: center;
				line-height: 50px;
				.icon {
					width: 50px;
					line-height: 50px;
					text-align: center;
					font-size: 16px;
					margin-right: 10px;
					background-color: $list--header-info-background;

				}
				.title {
					.label{
						font-size: 14px;
						font-weight: 500;
						line-height: 20px;
					}
					div.count{
						font-size: 10px;
						font-weight: 600;
						line-height: 15px;
						&:before{
							content: 'count: ';
							font-weight: 400;
						}
					}
				}
				.buttons {
					margin-left: auto;
					button {
						@include semi-transparent-button;
						margin-left: 3px;
					}
				}
			}
			.tools {
				padding: 5px 10px;
				border-top: 1px dotted $list--header-tools-border;
				display: flex;
				align-items: center;
				height: 41px;
				button { @include semi-transparent-dark-button;}
				&.search {
					input {
						width: 100%;
						@include input;
						font-weight: 500;
						text-align: center;
					}
				}
				&.paging {
					select {
						flex-grow: 1;
						margin-left: 5px;
						@include input;
						font-size: 11px;

					}

					input {
						@include input;
						font-weight: 500;
						text-align: center;
						width: 50px;
						margin: 0 5px;
					}
					.of {
						&:before {
							content: 'of ';
							font-weight: 400;
						}
						font-weight: 600;
						margin-right: 5px;
						color: white;
						font-size: 10px;
					}
				}
			}
		}
		.listing { overflow-y: auto;}
	}

</style>