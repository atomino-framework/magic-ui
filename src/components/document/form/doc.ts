import DocumentFormComponent from "./document-form.svelte"
import {SvelteComponent} from "svelte";
import FormFetcher from "./fetcher";
import {Writable, writable} from "svelte/store";
import Doc from "../doc";
import {documents} from "../doc-manager";
import Section from "./section";
import FormAction from "./action";
import List from "../../list/list";
import toastManager from "../../../elements/toast-manager";
import ErrorValidation from "../../../modules/error/error-validation";


export default class FormDoc extends Doc {

	public get class():typeof FormDoc{return Object.getPrototypeOf(this).constructor; }


	static component: typeof SvelteComponent = DocumentFormComponent;
	public static buttons: Array<any>;
	public static label: (item) => string;
	public static info: (item) => string;
	public static sections: Array<Section> = [];
	public static fetcher: FormFetcher;
	public static list: List;
	
	public validationErrors: Writable<Object> = writable([]);

	static create(
		$idPrefix: string,
		list: List,
		icon: string,
		fetcher: FormFetcher,
		buttons: Array<FormAction>,
		sections: Array<Section>,
		label: (item) => string,
		info: (item) => string = (item) => 'id: ' + item['id'],
	): typeof FormDoc {
		return Object.assign(class extends this {}, {$idPrefix, list, icon, buttons, label, sections, fetcher, info});
	}
	public get label(): string {return this.class.label(this._item);}
	public get info(): string {return this.class.info(this._item);}
	public get list(): List {return this.class.list;}
	public get exists(): boolean {return typeof this._item.id === 'number';}
	public get buttons(): Array<FormAction> {return this.class.buttons;}

	public _item: { id: number | null } = {id: null};
	public item: Writable<{ id: number | null }> = writable(this._item);

	load() {
		this.class.fetcher.get(this.id).then((item: { id: number }) => {
			this._item = item;
			this.item.set(item);
			this.id = item.id;
			documents.update(v => v);
		}).catch(e => {
			this.close()
			throw e;
		})
	}
	save() {
		this.validationErrors.set({})
		this.class.fetcher.save(this.id, this._item)
			.then(res => toastManager.success('Saved successfully'))
			.then(res => {
				this.list.reload();
				this.load();
			})
			.catch(error => {
				if (error instanceof ErrorValidation) {
					error.response.json().then(messages => {
						let errors = {};
						messages.forEach(message => {
							if (typeof errors[message.field] === "undefined") errors[message.field] = [];
							errors[message.field].push(message.message);
						})
						this.validationErrors.set(errors)
					})
				}
				throw error;
			})
	}
	delete() {
		if(confirm('You are about to delete:' + "\n" + this.label + "\n"+'Are you sure?'))
		this.class.fetcher.delete(this.id)
			.then(()=>this.close())
			.then(()=>this.list.reload())
	}

	static addSection(label:string, wide: boolean = false):Section{
		let section = new Section(label, wide);
		this.sections.push(section);
		return section;
	}
	static createSection(label: string, wide: boolean = false): Section { return new Section(label, wide);}
}
