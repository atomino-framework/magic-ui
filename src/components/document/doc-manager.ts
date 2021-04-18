import {Writable, writable} from "svelte/store";
import Doc from "./doc";

class DocManager {

	public active: Writable<Doc|null>;
	public _documents: Array<Doc> = [];
	public documents: Writable<Array<Doc>>

	constructor() {
		this.active = writable(null)
		this._documents = [];
		this.documents = writable(this._documents);
	}

	has($id: string): boolean { return this.docIndex($id) > -1; }

	docIndex($id: string): number { return this._documents.findIndex(item => item.$id === $id); }

	add(doc: Doc) {
		this._documents.push(doc);
		this.documents.set(this._documents);
	}
	show($id: string) { this.active.set(this._documents[this.docIndex($id)]); }
	close($id: string) {
		let index = this.docIndex($id);
		if (this._documents.length > 1) {
			if (index === this._documents.length - 1) {
				this.show(this._documents[index - 1].$id)
			} else {
				this.show(this._documents[index + 1].$id)
			}
		}
		this._documents.splice(index, 1);
		this.documents.set(this._documents);
	}
}

let docManager = new DocManager();
export default docManager;
export let documents = docManager.documents;
export let activeDocument = docManager.active;