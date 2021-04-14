<script lang="ts">
	export let value = false;
	export let name = '';

</script>

<input type="checkbox" bind:checked={value}>

<style lang="scss">
	@import "../../../../style/mixins";

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
		font-family: "Font Awesome 5 Pro";
		content: "\f204";
		font-size: 16px;
		color: $highlight-color;
		opacity: .6;
		transition: all .3s;
		font-weight: 100;
	}

	input:checked:before {
		opacity: 1;
		content: "\f205";
	}


</style>