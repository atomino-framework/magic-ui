import List from "../components/list/list";
import {activeList} from "./store";
import Doc from "../components/document/doc";

enum type {list, form, custom, menu}


export default class MenuItem {

	static readonly type = type;

	public action: Function | null = null;
	public type: number|null = null;
	public submenu: Array<MenuItem> = [];

	constructor(public label: string, public icon: string) {}


	static List(label:string, icon:string, list:List) {
		const menuItem = new MenuItem(label, icon);
		menuItem.action = () => activeList.update(() => list);
		menuItem.type = MenuItem.type.list;
		return menuItem;
	}

	static Page(label:string, icon:string, page: typeof Doc, id:number|null = null) {
		const menuItem = new MenuItem(label, icon);
		menuItem.action = () => page.open(id)
		menuItem.type = MenuItem.type.form;
		return menuItem;
	}

	static Menu(label:string, icon:string, submenu: Array<MenuItem>) {
		const menuItem = new MenuItem(label, icon);
		menuItem.submenu = submenu;
		menuItem.type = MenuItem.type.menu;
		return menuItem;
	}

	static Custom(label:string, icon:string, action: Function) {
		const menuItem = new MenuItem(label, icon);
		menuItem.action = action;
		menuItem.type = MenuItem.type.custom;
		return menuItem;
	}

	activate() {
		if (typeof this.action === "function") this.action();
		return this;
	}
}