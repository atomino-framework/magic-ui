<script>
	import MenuItem from "../modules/menu-item.ts";
	import {onMount} from 'svelte';

	export let isOpen = true;
	export let isSubmenu = false;
	export let menu;
	export let wide;
	let nav;
	let opened = {}

	function action(item, i) {
		if (item.type === MenuItem.type.menu) opened[i] = !opened[i];
		else item.action()
	}

	onMount(() => { nav.style.height = nav.scrollHeight + "px";});
</script>

<nav bind:this={nav} class:wide={wide} class:open={isOpen} class:isSubmenu={isSubmenu}>
	{#each menu as item, i}
		<button on:click={()=>action(item, i)} class="closed" class:has-submenu={item.type === MenuItem.type.menu}>
			<i class={"icon " + item.icon}></i>
			<span>{item.label}</span>
			{#if item.type === MenuItem.type.menu}
				<i class="marker fa-fw fal fa-chevron-left" class:open={opened[i]}></i>
			{/if}
		</button>
		{#if item.type === MenuItem.type.menu}
			<svelte:self menu={item.submenu} wide={wide} isOpen={opened[i] === true} isSubmenu={true}/>
		{/if}
	{/each}
</nav>

<style lang="scss">

	@import "../style/vars";

	nav {
		transition: all .15s;
		transform: scaleY(1);
		transform-origin: top;
		opacity: 1;

		&:not(.open) {
			height: 0 !important;
			transform: scaleY(0);
			opacity: 0;
			overflow: hidden;
		}


		&.wide button span {
			transform: scale(1);
			opacity: 1;
		}

		&:not(.wide) button {
			span {
				transform: scale(0);
				opacity: 0;
			}
			i.marker { display: none;}
		}

		button {
			display: flex;
			align-items: center;
			transition: all .3s;
			padding: 0;
			border: 0;
			background: $menu--button-background;
			color: $menu--button-color;
			height: 32px;
			border-top: 1px dotted $menu--button-border-color;
			font-size: 16px;
			cursor: pointer;
			width: 100%;
			overflow: hidden;
			text-align: left;
			&.has-submenu {}
			&:hover {
				text-shadow: 0 0 11px $menu--button-glow-color;
				i.icon { transform: translateX(4px);}
				background-color: $menu--button-hover-background;
			}

			i.icon {
				transition: all .3s;
				margin-left: 12px;
				margin-right: 12px;
				flex-grow: 0;
				flex-shrink: 0;
				flex-basis: 20px;
				filter: drop-shadow(3px 3px 2px $menu--button-icon-shadow);
			}

			span {
				white-space: nowrap;
				transform-origin: left;
				display: inline-block;
				transition: all .3s;
				font-size: 11px;
				font-weight: 600;
				flex-grow: 1;
			}

			i.marker {
				font-size: 12px;
				height: 12px;
				width: 12px;
				margin-right: 10px;
				transition: all .2s;
				&.open { transform: rotateZ(-90deg);}
			}
		}

		&.isSubmenu {
			background: linear-gradient(90deg, $menu--sub-button-background, transparent);
			border-left: 3px solid $menu--sub-button-marker;
			button {
				i.icon {
					margin-left: 12px;
					font-size: 12px;
				}
				span {
					font-size: 11px;
					font-weight: 400;
				}
			}
		}
	}
</style>