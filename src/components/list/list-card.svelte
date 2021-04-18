<script lang="ts">
    import List from "./list.ts";
	export let item;
    export let list:List;
</script>

<main on:click={item.action} class:inactive={!item.active}>
	{#if item.img}
		<img alt="{item.label}" src="{item.img}" loading="lazy">
	{/if}
	<header>
		{#if item.avatar}
			<span class="avatar"><img alt="{item.label}" src={item.avatar} loading="lazy"/></span>
		{/if}

		<span class="info">
					<span class="label ellipsis">{item.label}</span>
					<span class="id">{item.id}</span>
				</span>
		{#if item.icons}
			<span class="icons">
				{#each item.icons as icon}
					<span class="fa-stack fa-2x" style="font-size:10px;" title="{icon.hint}">
						<i class="fas fa-circle fa-stack-2x" style="color:#000c"></i>
						<i class="{icon.icon} fa-stack-1x fa-inverse" style="color:{icon.color ? icon.color : '#fffd'}"></i>
					</span>
				{/each}
			</span>
		{/if}
	</header>
	{#if item.properties}
		<span class="props">
			{#each item.properties as property}
				<span class="label">{property.label}</span>
				<span class="value">{property.value}</span>
			{/each}
		</span>
	{/if}

	{#if item.actions}
		<footer>
			{#each item.actions as action}
				<button on:click|stopPropagation={()=>action.onClick(list)} title="{action.label}"><i class={action.icon}></i></button>
			{/each}
		</footer>
	{/if}
</main>

<style lang="scss">
	@import "../../style/vars";
	@import "../../style/mixins";

	main {
		@include card;
		margin: 10px;
		overflow: hidden;
		transition: all .15s;
		cursor: pointer;
		&.inactive {opacity: .6;}

		&:hover {
			opacity: 1;
			box-shadow: 0 0 0 0 transparent;
			transform: translateY(3px);
		}

		header {
			padding: 10px;
			display: flex;
			align-items: center;
			.avatar {
				margin-right: 10px;
				float: left;
				img {
					width: 32px;
					height: 32px;
					border-radius: 16px;
				}
			}
			.info {
				min-width: 0;
				.label {
					line-height: 16px;
					display: block;
					font-weight: bold;
				}
				.id {
					display: block;
					font-size: 10px;
					font-weight: 500;
					&:before {content: 'id: '; font-weight: 400}
				}
			}
			.icons {
				margin-left: auto;
				white-space: nowrap;
				height: 28px;
				font-size: 16px;
			}
		}

		.props {
			display: grid;
			grid-auto-columns: auto 1fr;
			margin-bottom: 3px;
			line-height: 20px;
			.label, .value {
				border-top: 1px dotted $list-card--border;
				padding: 0 10px;
				font-size: 11px;
			}
			.label {
				font-size:10px;
				grid-column: 1;
				font-weight: 400;
			}
			.value { grid-column: 2; font-weight: 500;}
		}

		.img {
			display: block;
			height: 120px;
			overflow: hidden;
			background-position: center center;
			background-size: cover;
			box-shadow: 0 16px 11px -14px $list-card--img-shadow;
		}
		footer {
			border-top: 1px solid $list-card--border;
			@include button-bar;
			button {@include transparent-button;}
		}
	}
</style>