<script>
	import {portal} from "svelte-portal";
	import {toasts} from "./toast-manager";
</script>

<main use:portal={"body"}>
	{#each $toasts as toast}
		<section class:hide={toast.hide} class="{toast.type}">
			<i class={"fa "+ toast.icon}></i>
			<div class="label">{toast.label}
				<div class="info">{toast.info}</div>
			</div>
		</section>
	{/each}
</main>

<style lang="scss">
	@import "../style/vars";

	main {
		position: fixed;
		right: 0;
		bottom: 0;
		color: white;
		display: flex;
		align-items: center;
		flex-direction: column;
		z-index: 99999;


		section {
			background-color: #0009;

			&.error {
				background-color: #ff3300;
			}

			&.info {
				background-color: #0075cd;
			}

			&.success {
				background-color: #43a500;
			}

			&.hide {
				opacity: 0;
				transform: scale(0);
			}

			opacity: 1;
			transition: all .3s;
			width: 320px;
			box-shadow: rgba(0, 0, 0, 0.6) 0 16px 11px -14px;
			border-radius: 4px;
			border-top: 1px solid #fff5;
			border-bottom: 1px solid #0006;
			margin: 0 10px 10px 0;
			padding: 10px;

			display: flex;

			i {
				display: block;
				font-size: 16px;
				margin-right: 10px;
				padding-right: 10px;
				border-right: 1px solid #fff3;
			}

			div {
				font-weight: 700;

				div {
					font-size: 11px;
					font-weight: 400;
				}
			}
		}
	}
</style>