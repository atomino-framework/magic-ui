<script>
	import Overlay from "../elements/overlay.svelte";
	import UserModel from "../modules/user-model.ts";

	let loginName = "elvis@elvis.hu"
	let password = 'galaga';

	let authenticating = null;

	function login() { authenticating = UserModel.login(loginName, password)}
</script>

<main>
	<form on:submit|preventDefault={login}>
		<input type="text" placeholder="login" name="login" bind:value={loginName}/>
		<input type="password" placeholder="password" name="password" bind:value={password}/>
		<button type="submit">Login</button>
		powered by <b>Atomino & Magic</b>
	</form>
</main>

{#await authenticating}
	<Overlay>Loading</Overlay>
{/await}

<style lang="scss">
	@import "../style/vars";
	@import "../style/mixins";

	main {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 10px;

		form {
			width: 220px;
			margin: 0 auto;
			text-align: center;
			padding: 10px;
			@include card;

			input {
				width: 200px;
				margin-bottom: 10px;
				@include input
			}

			button {
				width: 200px;
				margin-bottom: 10px;
				@include button;
			}
		}
	}
</style>