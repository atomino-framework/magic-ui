<svelte:options accessors/>
<script lang="ts">
	import FormDoc from "../form/doc";
	import {writable} from "svelte/store";
	import File from "./attachment-file.svelte";

	export let name: string = '';
	export let label: string = '';
	export let doc: FormDoc = null;
	export let reload: Function = null;
	let input;

	let files = writable([]);

	function upload() {
		let jobs = [];
		[...input.files].forEach((file) => {
			jobs.push(doc.class.fetcher.attachment.upload(name, file, doc.id));
		});
		Promise.all(jobs)
			.then(result => get())
			.then(() => input.value = '')
	}


	export let get = () => {
		doc.class.fetcher.attachment.get(doc.id, name).then(res => $files = res ?? [])
	}
	get();

	let over = false;

	function dragover(event) {
		if (event.dataTransfer.types[0] === 'attachment') {
			if (event.dataTransfer.types[1] !== name) {
				over = true;
			}
		}
	}

	function drop(event){
		if(over){
			doc.class.fetcher.attachment.add(doc.id, name, event.dataTransfer.getData('file'), event.shiftKey ? null : event.dataTransfer.getData('collection')).then(reload);
		}
		over = false;
	}

</script>
<section class="block" on:dragover={dragover} class:over on:drop={drop} on:dragleave={()=>over = false} on:dragover|preventDefault={()=>{}}>
	<input bind:this={input} multiple type="file" style="display: none" on:change={upload}>
	<div class="block-label"><b>{label}</b><span>({name})</span><i on:click={()=>{input.click()}} class="fas fa-folder-upload"></i></div>
	<div class="files">
		{#each $files as file, index}
			<File file={file} doc={doc} collection={name} reload={reload} index={index}/>
		{/each}
	</div>
</section>

<style lang="scss">
	section.block {
		flex-grow: 1;
		text-align: left;
		display: block;
		background-color: #ffffff;
		color: #666666;
		margin: 10px;
		border: 1px solid #eeeeee;
		box-shadow: 0 13px 10px -10px rgb(0 0 0 / 30%);

		&.over {
			background-color: #ff5900;
		}

		div.block-label {
			padding: 0 10px;
			line-height: 30px;
			border-bottom: 1px solid #eee;
			background-color: #f9f9f9;
			display: flex;
			span {
				font-size: 10px;
				flex-grow: 1;
				padding-left: 5px;
			}
			i {
				font-size: 16px;
				line-height: 30px;
				cursor: pointer;
			}
		}
		div.files {
			padding: 5px;
		}
	}
</style>