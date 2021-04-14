<script>
	export let label;
	export let inlineLabel;
	export let hint;
</script>
<section class:vertical={!inlineLabel}>
	<span class="label">
		{#if hint}<i class="hint-marker fad fa-info-circle"></i>{/if}
		{label}
	</span>
	<slot/>
</section>
{#if hint}
	<div class="hint">{@html hint}</div>
{/if}

<style lang="scss">
	section {
		margin: 0;
		border: 0;
		padding: 8px;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;


		&:not(:first-of-type) {
			border-top: 1px dotted #fff2;
		}
		&.vertical {
			flex-direction: column;
			.label {
				line-height: 24px;
				margin-bottom: 6px;
				width: 100%;
				display: block;
			}
		}
		.label {
			width: 120px;
			min-width: 120px;
			color: #fffb;
			font-size: 11px;
			.hint-marker {
				margin-right: 5px;
				cursor: pointer;
			}
		}
	}
	.hint {
		background-color: #0006;
		padding: 15px 10px;
		border-top: 1px dotted #fff1;
		color: #fff9;
		width: 100%;
		font-size: 11px;
	}
</style>