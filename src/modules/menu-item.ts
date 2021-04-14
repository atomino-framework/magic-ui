import List from "../components/list/list";
import {activeList} from "./store";
import Doc from "../components/document/doc";

enum type {list, form, custom, menu}


export default class MenuItem {

	static readonly type = type;

	public action: Function | null = null;
	public type = null;
	public submenu = [];

	constructor(public label: string, public icon: string) {}


	static List(label:string, icon:string, list:List) {
		const menuItem = new MenuItem(label, icon);
		menuItem.action = () => activeList.update(() => list);
		menuItem.type = MenuItem.type.list;
		return menuItem;
	}

	static Page(label, icon, page: typeof Doc, id:number|null = null) {
		const menuItem = new MenuItem(label, icon);
		menuItem.action = () => page.open(id)
		menuItem.type = MenuItem.type.form;
		return menuItem;
	}

	static Menu(label, icon, submenu) {
		const menuItem = new MenuItem(label, icon);
		menuItem.submenu = submenu;
		menuItem.type = MenuItem.type.menu;
		return menuItem;
	}

	static Custom(label, icon, action) {
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