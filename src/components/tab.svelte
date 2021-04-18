<script lang="ts">
	import Doc from "./document/doc.ts";

	export let selected;
	export let doc: Doc;

	function close(doc: Doc) {
		if (selected) doc.close()
	}

</script>

<main class:selected on:click title="{doc.label}">
	<i class={doc.icon}></i>
	<span class="info">{doc.info}</span>
	<i on:click={()=>close(doc)} class="close fas fa-times"></i>
	<span class="label">{doc.label}</span>
</main>

<style lang="scss">
	main {
		grid-area: tab;
		height: 50px;
		padding: 10px;
		max-width: 200px;
		position: relative;
		border-top: 3px solid transparent;
		color: #fff9;
		user-select: none;
		cursor: pointer;
		transition: all .3s;
		&:hover {
			color: #fff;
		}

		.info {
			margin-left: 5px;
			font-size: 9px;
		}
		i.close {
			float: right;
			color: orangered;
			margin-left: 10px;
			transition: all .3s;
			cursor: pointer;
			opacity: 0;
			&:hover {
				transform: rotateZ(360deg);
			}
		}
		.label {
			display: block;
			font-weight: bold;
			font-size: 11px;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		&:before {
			content: '';
			height: 30px;
			margin: 10px 0;
			width: 0;
			border-right: 1px solid #fff3;
			display: block;
			position: absolute;
			top: 0;
			left: 0;
		}
		&:last-child:after {
			content: '';
			height: 30px;
			margin: 10px 0;
			width: 0;
			border-right: 1px solid #fff3;
			display: block;
			position: absolute;
			top: 0;
			right: 0;
		}

		&.selected, &:first-child {
			&:before {display: none;}
		}
		&.selected + :global(main) {
			&:before {display: none;}
		}

		&.selected {
			i.close {
				opacity: 1;
			}
			color: #fff;
			background-color: #000;
			border-top: 3px solid #00b7ff;
			box-shadow: 0 0 21px 0 rgba(0, 0, 0, 0.75);
			&:after {display: none;}
		}
	}
</style>