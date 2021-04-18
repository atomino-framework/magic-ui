<script lang="ts">
	export let value = "";
	export const name = '';
	export let code = false;

	function keydown(event) {
		let input = event.target;
		if (event.keyCode === 9) {
			let v = input.value;
			let s = input.selectionStart
			let e = input.selectionEnd;
			input.value = v.substring(0, s) + '	' + v.substring(e);
			input.selectionStart = input.selectionEnd = s + 1;
			event.preventDefault();
		}
	}
</script>

<div class:growing={true} class:code data-replicated-value={value}>
	<textarea class:code on:keydown={keydown} bind:value></textarea>
</div>

<style lang="scss">
	@import "../../../../style/mixins";
	div.growing {
		display: grid;
		white-space: pre-wrap;
		width: 100%;
		&::after {
			content: attr(data-replicated-value) " ";
			white-space: pre-wrap;
			visibility: hidden;
		}
		flex-grow: 1;
	}
	textarea.code,
	div.growing.code::after {
		font-family: "Courier New", monospace;
		tab-size: 3;
		font-weight: bold;
	}
	div.growing::after,
	textarea {
		@include input;
		grid-area: 1 / 1 / 2 / 2;
		line-height: 20px;
		font-weight: 400;
	}
</style>