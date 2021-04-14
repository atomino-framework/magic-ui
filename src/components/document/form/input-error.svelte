<script>
	export let message;
	export let field;
	export let label;
</script>
<div><i class="fas fa-exclamation-circle"></i> <b>{message}</b> ({field} / {label})</div>

<style lang="scss">
	div {
		line-height: 26px;
		i{
			font-size:12px;
			margin-right: 4px;
		}
		font-size: 11px;
		background-color: #940000cc;
		color: #ff5900;
		padding: 0 10px;
		border-top: 1px dotted #fff1;
		width: 100%;
	}
</style>