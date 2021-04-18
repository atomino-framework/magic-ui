<script lang="ts">
	export let value = "";
	export const name = '';

</script>

<input type="date" bind:value>

<style lang="scss">
	@import "../../../../style/mixins";
	input{
		@include input;
		flex-grow: 1;
	}
</style>