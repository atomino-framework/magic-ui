import {SvelteComponent} from "svelte";
import ListCardComponent from "./list-card.svelte"

class Icon {
	constructor(type: string, public icon: string, public color: string|null = null, public hint: string | null = null) { this.icon = type + ' ' + icon;}
}

class Property {
	constructor(public label: string, public value: string) {}
}

class Action {
	constructor(public icon: string, public label: string, public onClick: (item:any) => void) {}
}


class Cardify {
	constructor(
		public id: number,
		public action: (item:any) => void,
		public label: string,
		public active: boolean = true,
		public img: string | null = null,
		public avatar: string | null = null,
		public icons: Array<Icon> | null = null,
		public properties: Array<Property> | null = null,
		public actions: Array<Action> | null = null
	) {}
}

export default class ListCard{

	public static  Component: typeof SvelteComponent = ListCardComponent;

	static Cardify(
		id: number,
		action: (item:any) => void,
		label: string,
		active: boolean = true,
		img: string | null = null,
		avatar: string | null = null,
		icons: Array<Icon> | null = null,
		properties: Array<Property> | null = null,
		actions: Array<Action>|null = []
	): Cardify {return new Cardify(id, action, label, active, img, avatar, icons, properties, actions)}

	static Icon (type: string, icon: string, color: string | null = null, hint: string | null = null): Icon { return new Icon(type, icon, color, hint)}

	static Property (label: string, value: string): Property { return new Property(label, value); }

	static Action (icon: string, label: string, onClick: (item:any) => void) { return new Action(icon, label, onClick);}
}