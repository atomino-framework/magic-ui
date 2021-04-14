<script lang="ts">
	export let value = "";
	export let name = '';

</script>
<script context="module"></script>
<input type="text" bind:value>

<style lang="scss">
	@import "../../../../style/mixins";
	input{
		@include input;
		flex-grow: 1;
	}
</style>