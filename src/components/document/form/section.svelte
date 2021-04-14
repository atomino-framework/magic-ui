<script>
	export let label;
	export let wide;
</script>
<section class:wide>
	<header>{label}</header>
	<slot />
</section>

<style lang="scss">
	@import "../../../style/mixins";

	section{
		@include card;
		min-width: 400px;
		flex-grow: 1;
		flex-basis: 0;
		overflow: hidden;

		&.wide {
			flex-basis: auto;
			width: 100%;
		}
		border-radius: 3px;
		margin: 0 10px 10px 0;
		background: linear-gradient(180deg, #000c, #0008);
		box-shadow: 0 16px 11px -14px rgba(0, 0, 0, 0.6);

		backdrop-filter: blur(4px);

		header{
			background-color: #0005;
			border-bottom: 1px solid #fff1;
			padding: 10px;
		}
	}
</style>