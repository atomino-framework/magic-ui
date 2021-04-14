import {Writable, writable} from "svelte/store";
import {SvelteComponent} from "svelte";

export let modals: Writable<Array<Modal>> = writable([])

class ModalManager {
	show(Component:typeof SvelteComponent, properties:Object = {}) {
		modals.update(modals => [...modals, new Modal(Component, properties)]);
	}
	close(modal:Modal) {
		modals.update(modals => {
			let index = modals.indexOf(modal);
			if (index > -1) modals.splice(index, 1);
			return modals;
		})
	}
}

const modalManager = new ModalManager();

export default modalManager;

export class Modal {
	constructor(public Component: typeof SvelteComponent, public properties:Object) {}
	close() {return ()=>modalManager.close(this);}
}