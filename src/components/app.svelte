<script>
	import AppLogin from "./app-login.svelte";
	import AppAdmin from "./app-admin.svelte";
	import {user} from "../modules/store.ts";
	import Overlay from "../elements/overlay.svelte"
	import Toast from "../elements/toast.svelte"
	import Modals from "../elements/modals.svelte"
	import UserModel from "../modules/user-model.ts";
	import ErrorHandler from "../modules/error/error-handler.ts";
	ErrorHandler.register();
	let fetchIsAuthenticated = UserModel.isAuthenticated();
</script>

{#await fetchIsAuthenticated}
	<Overlay icon="fad fa-spinner fa-spin">
		Initializing magic...
	</Overlay>
{:then value}
	{#if $user === null}
		<AppLogin/>
	{:else }
		<AppAdmin/>
	{/if}
{/await}
<Toast/>
<Modals/>

<style global lang="scss">
	@import "../style/fa.scss";
	@import "../style/global.scss";
</style>
