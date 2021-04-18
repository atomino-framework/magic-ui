<script>
	import UserModel from "../modules/user-model.ts";
	import {user, settings} from "../modules/store.ts";
	import Menu from "./menu.svelte";

	let wide = localStorage.getItem('nav-panel-wide');
	function setWide() { (wide = !wide) ? localStorage.setItem('nav-panel-wide', '1') : localStorage.removeItem('nav-panel-wide')}
</script>

<main class:wide={wide}>
	<div class="user">
		<img on:click={ setWide } src={$user.avatar ?? $settings.defaultAvatar} alt={$user.name}/>
		<span>{$user.name}</span>
		<div on:click={UserModel.logout} class="logout"><i class="fas fa-times"></i></div>
	</div>
	<Menu menu={$settings.menu} wide={wide}/>
</main>

<style lang="scss">

	@import "../style/vars";

	main {
		grid-area: nav;
		height: 100%;
		background-color: $nav-panel--background;
		backdrop-filter: blur(4px);
		transition: all .3s;

		&.wide {
			width: 200px;

			div.user div.logout {
				opacity: 1;
			}
		}

		&:not(.wide) {
			width: 50px;

			div.user div.logout {
				opacity: 0;
			}
		}

		div.user {
			background-color: $nav-panel--user-background;
			height: 50px;
			position: relative;
			display: flex;
			align-items: center;
			color: white;

			img {
				margin: 9px;
				width: 32px;
				height: 32px;
				border-radius: 15px;
				background-color: $nav-panel--user-avatar-background;
				display: inline-block;
				vertical-align: middle;
				transition: all .3s;
				cursor: pointer;

				&:hover {
					transform: rotateZ(360deg);
				}
			}

			span {
				display: inline-block;
				line-height: 32px;
				height: 32px;
				overflow: hidden;
			}

			div.logout {
				transition: all .3s;
				color: $nav-panel--logout-color;
				font-size: 16px;
				cursor: pointer;
				margin: 0 10px 0 auto;

				&:hover {
					transform: rotateZ(180deg);
				}
			}

			overflow: hidden;
		}
	}
</style>