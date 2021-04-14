<script>
	import {modals} from "./modal-manager";
</script>

{#each $modals as Modal}
	<Modal.Component {...Modal.properties} close={Modal.close()}/>
{/each}
