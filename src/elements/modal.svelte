<script lang="ts">
	import Overlay from "./overlay.svelte";

	export let icon: string = "inverse fad fa-atom";
	export let title: string = "Magic";
	export let big: boolean = false;
	export let full: boolean = false;
	export let rounded: boolean = false;

	let modal;

	export const shake = function (timeout = 800) {
		console.log('CALLED')
		return new Promise(resolve => {
			modal.classList.add('shake');
			setTimeout(() => {
				modal.classList.remove('shake');
				resolve(this);
			}, timeout);
		});
	}
</script>

<Overlay icon={false}>
	<main class:big class:full class:rounded bind:this={modal} class="modalify">
		<header>
			<i class={icon}></i>
			<div>{title}</div>
			<slot name="nav"/>
		</header>
		<section>
			<slot/>
		</section>
		<slot name="footer"/>
	</main>
</Overlay>

<style lang="scss" global>
	@keyframes shake {
		10%, 90% { transform: translate3d(-1px, 0, 0); }
		20%, 80% { transform: translate3d(2px, 0, 0); }
		30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
		40%, 60% { transform: translate3d(4px, 0, 0); }
	}
	.modalify {
		min-width: 300px;
		max-width: 650px;
		background-color: white;
		margin: 0 auto;
		box-shadow: 0 0 10px rgba(0, 0, 0, .5);
		display: flex;
		flex-direction: column;
		border: 1px solid white;
		overflow: hidden;
		&.rounded {border-radius: 10px;}

		&.big {
			max-width: calc(100vw - 60px);
			width: calc(100vw - 60px);
			height: calc(100vh - 60px);
		}

		&.full {
			width: 100vw;
			max-width: 100vw;
			height: 100vh;
		}


		&.shake {
			animation: shake 0.8s cubic-bezier(.36, .07, .19, .97) both;
			transform: translate3d(0, 0, 0);
			backface-visibility: hidden;
			perspective: 1000px;
		}

		> header {
			height: 45px;
			position: relative;
			border-bottom: 1px solid #ddd;
			display: flex;

			> i {
				display: inline-block;
				line-height: 44px;
				width: 44px;
				background-color: #666;
				text-align: center;
				color: #fff;
				float: left;
				font-size: 24px;
				&.inverse {
					color: #666;
					background-color: #fff;
					border-right: 1px solid #eee;
				}
			}
			> div {
				flex-grow: 1;
				margin: 0;
				padding: 0 10px;
				line-height: 44px;
				color: #666;
				display: inline-block;
				font-weight: bold;
				font-size: 12px;
				text-align: left;
			}
			nav {
				button {
					cursor: pointer;
					display: inline-block;
					background-color: transparent;
					line-height: 44px;
					width: 44px;
					text-align: center;
					color: #999;
					border: 0;
					margin: 0;
					padding: 0;
					transition: all .3s;
					&:hover { color: #333;}
					border-left: 1px solid #eee;
					font-size: 16px;
				}
			}
		}

		> section {
			flex-grow: 1;
			overflow: auto;
			position: relative;
			height: 100%;
		}

		> footer {
			display: flex;
			flex-shrink: 0;
			align-items: stretch;
			margin: 1px 0 0 0;
			&.stacked { flex-direction: column;}
			button {
				border: 0;
				font-weight: bold;
				font-size: 11px;
				padding: 10px 20px;
				color: #333;
				background-color: #eee;
				flex-grow: 1;
				margin: 0;
				transition: all .3s;
				&:not(:last-of-type) { margin-right: 1px;}
				cursor: pointer;
				&:hover { background-color: #e6e6e6;}
				&.primary, &.success, &.info, &.warning, &.danger {color: white;}
				&.primary {
					background-color: #337ab7;
					&:hover { background-color: #286090;}
				}
				&.success {
					background-color: #5cb85c;
					&:hover { background-color: #449d44;}
				}
				&.info {
					background-color: #5bc0de;
					&:hover { background-color: #31b0d5;}
				}
				&.warning {
					background-color: #f0ad4e;
					&:hover { background-color: #ec971f;}
				}
				&.danger {
					background-color: #d9534f;
					&:hover { background-color: #c9302c;}
				}
			}
		}
	}
</style>