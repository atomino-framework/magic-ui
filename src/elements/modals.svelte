<script>
	import {modals} from "./modal-manager.ts";
</script>

{#each $modals as Modal}
	<Modal.Component {...Modal.properties} close={Modal.close()}/>
{/each}
