<script lang="ts">
	export let value = "";
	export let name = '';

</script>

<input type="text" maxlength="7" minlength="7" bind:value>
<input type="color" bind:value>

<style lang="scss">
	@import "../../../../style/mixins";
	input{
		@include input;
	}
	input[type="text"] {
		width: 80px;
		border-bottom-right-radius: 0;
		border-top-right-radius: 0;
	}
	input[type="color"]{
		border-bottom-left-radius: 0;
		border-top-left-radius: 0;

		flex-grow: 2;
		padding:2px;
		-webkit-appearance: none;
		cursor: pointer;
		height: 26px;
		&::-webkit-color-swatch-wrapper {
			padding: 0;
		}
		&::-webkit-color-swatch {
			border: none;
		}
	}
</style>