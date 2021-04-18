<script lang="ts">
	import Section from "./section.svelte"
	import Input from "./input.svelte"
	import Error from "./input-error.svelte"
	import type FormDoc from "./doc.ts";

	export let doc: FormDoc;
	let item = doc.item;
	let validationErrors = doc.validationErrors;
	doc.load();
</script>

<header>
	<i class="icon {doc.icon}"></i>
	<div>
		<div class="label"> {doc.label}</div>
		<div class="info">{doc.info}</div>
	</div>
	<nav class="nav">
		{#each doc.buttons as button}
				<button disabled={!button.active(doc)} on:click={()=>button.onClick(doc)}><i class={button.icon}></i></button>
		{/each}
	</nav>
</header>

<main>
	{#each doc.class.sections as section}
		<Section label={section.label} wide={section.wide}>
			{#each section.inputs as input}
				<Input label={input.label} inlineLabel={input.inlineLabel} hint={input.hint}>
					<svelte:component this={input.component} name={input.field} {...input.props} bind:value={$item[input.field]}/>
				</Input>
				{#if $validationErrors[input.field]}
					{#each $validationErrors[input.field] as message}
						<Error message={message} field={input.field} label={input.label}/>
					{/each}
				{/if}
			{/each}
		</Section>
	{/each}
</main>

<style lang="scss">
	@import "../../../style/mixins";
	header {
		position: sticky;
		top: 0;
		backdrop-filter: blur(4px);
		z-index: 100;
		height: 82px;
		padding: 10px 20px 10px 0;
		background: linear-gradient(180deg, #000, #0008);
		box-shadow: 0 16px 11px -14px rgba(0, 0, 0, 0.6);
		display: flex;
		align-items: center;
		.icon {
			font-size: 32px;
			height: 50px;
			line-height: 50px;
			width: 82px;
			text-align: center;
			border-right: 1px solid #fff3;
		}
		.label {
			padding-left: 10px;
			font-size: 16px;
			font-weight: 500;
		}
		.info {
			padding-left: 10px;
			font-weight: 400;
			font-size: 10px;
		}

		.nav {
			margin-left: auto;
			button{
				margin-left:3px;
				@include semi-transparent-button;
				font-size: 16px;
				&:disabled{
					opacity: .3;
				}
			}
		}
	}
	main {
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		margin: 10px 0 0 10px;
	}

</style>