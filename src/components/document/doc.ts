import docManager, {activeDocument, documents} from "./doc-manager";
import ErrorMessage from "../../modules/error/error-message";
import {SvelteComponent} from "svelte";

export default class Doc {
	public get class():typeof Doc{return Object.getPrototypeOf(this).constructor; }

	static component: typeof SvelteComponent;
	static $idPrefix: string;
	static $id(id: number | string = ''): string {return this.$idPrefix + '--' + id;}
	static open(id: number | null = null): void {
		let $id = this.$id(id)
		if (!docManager.has($id)) docManager.add(new this(id));
		docManager.show($id)
	}
	static create(...any): any {}
	public static icon: string;
	public get icon(): string {return this.class.icon;}

	protected _id: null | number;
	public get label(): string {return "LABEL";}
	public get info(): string {return "INFO";}

	public constructor(id: null | number) {this._id = id;}

	get component(): typeof SvelteComponent { return Object.getPrototypeOf(this).constructor.component; }
	get $id(): string { return Object.getPrototypeOf(this).constructor.$id(this.id) }

	public get id(): number { return this._id;}
	public set id(id: number) {
		if (id === this._id) return;
		if (docManager.has(this.class.$id(id))) throw new ErrorMessage('Can not change document id', 'Duplicate document id: ' + this.class.$id(id));
		this._id = id;
		documents.update(v => v)
	}

	close() { docManager.close(this.$id);}
}

Doc.create = function (component: typeof SvelteComponent, $idPrefix: string): typeof Doc {return Object.assign(class extends Doc {}, {component, $idPrefix});}