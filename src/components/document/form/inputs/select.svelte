<script lang="ts">
	export let value: string = '';
	export let options = [];
	export const name = '';

	function input(event) {
		value = event.target.value
	}
</script>

<select name="{name}" bind:value>
	{#each options as option}
		<option value={option.value}> {option.label}</option>
	{/each}
</select>

<style lang="scss">
	@import "../../../../style/mixins";

	select {
		@include input;
		-webkit-appearance: none;
	}
</style>