<script lang="ts">
	export let value: string = '';
	export let options = [];
	export const name = '';

	function input(event){
		value = event.target.value
	}

</script>
<main>
	{#each options as option}
		<label><input name={name} on:input={input} type="radio" value={option.value} checked={option.value === value}> {option.label}</label>
	{/each}
</main>

<style lang="scss">
	@import "../../../../style/mixins";

	main {
		@include input;
		//border-bottom: 1px solid #fff3;
		padding: 0;
		line-height: 26px;
		//border-radius: 4px;
		//color: #5fd1ff;
		//font-weight: 500;
		//background-color: #0009;
		max-height: 100px;
		overflow-y: auto;
		column-width: 120px;
		column-rule: 1px solid #fff1;
		column-gap: 0;
		display: flex;


		label {
			cursor: pointer;
			transition: all .2s;
			&:hover {
				background-color: $input--background-focused;
				color: white;
			}
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: 0 8px;
			display: block;
			font-size: 11px;
			font-weight: bold;
			input {vertical-align: middle;}
		}

		input {
			-moz-appearance: none;
			-webkit-appearance: none;
			-o-appearance: none;
			outline: none;
			content: none;
			cursor: pointer;
			text-shadow: 0 0 6px black;
		}

		input:before {
			transition: all .2s;
			font-family: "Font Awesome 5 Pro";
			content: "\f204";
			font-size: 16px;
			color: $highlight-color;
			opacity: .65;
			font-weight: 100;
		}
		input:checked:before {
			opacity: 1;
			content: "\f205";
		}
	}


</style>