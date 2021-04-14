<script lang="ts">
	export let name = '';

	export let value = '0';
	let oldvalue = value;
	function input() {
		if(value === '') return value = '0';
		if(value === '0-' || value === '-') return value = '-0';
		let val = parseInt(value)
		if (isNaN(val))value = oldvalue;
		else value = val.toString();
		oldvalue = value;
	}
</script>
<script context="module"></script>
<input type="text" bind:value on:input={input}>

<style lang="scss">
	@import "../../../../style/mixins";
	input {
		@include input;
		flex-grow: 1;
	}
</style>