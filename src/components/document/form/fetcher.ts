import handleFetch from "../../../modules/fetch-error-handler";
import FormDoc from "./doc";
import {documents} from "../doc-manager";

export default class FormFetcher {

	public attachment: AttachmentFetcher

	constructor(readonly api: string) {
		this.api = this.api + '/'
		this.attachment = new AttachmentFetcher(this.api + 'attachments/');
	}

	get(id: number | null): Promise<Object> { return fetch(this.api + (id !== null ? id : 'blank')).then(handleFetch)}

	save(id: number | null, item: Object) {
		return fetch(this.api + (id !== null ? id : 'new'),
			{
				method: 'POST',
				body: JSON.stringify({item})
			}).then(handleFetch)
	}

	delete(id: number | null) { return fetch(this.api + id, {method: "DELETE"}).then(handleFetch)}
}

class AttachmentFetcher {
	constructor(readonly api: string) {}
	get(id: number, collection: string) { return fetch(this.api + id + '/' + collection).then(handleFetch)}
	upload(collection: string, file: File, id: number) {
		let data = new FormData()
		data.append('file', file)
		data.append('collection', collection)
		return fetch(this.api + 'upload/' + id, {method: "POST", body: data}).then(handleFetch);
	}
	modify(id: number, filename: string, data: object) {
		return fetch(this.api + 'modify/' + id, {method: "POST", body: JSON.stringify({filename, data})}).then(handleFetch);
	}
	remove(collection: string, id: number, filename: string) {
		return fetch(this.api + 'delete/' + id, {method: "POST", body: JSON.stringify({filename, collection})}).then(handleFetch);
	}
	order(id: number, collection: string, filename: string, index: number) {
		return fetch(this.api + 'order/' + id, {method: "POST", body: JSON.stringify({collection, index, filename})}).then(handleFetch)
	}
	add(id: number, collection: string, filename: string, from: boolean | string) {
		return fetch(this.api + 'add/' + id, {method: "POST", body: JSON.stringify({collection, filename, from})}).then(handleFetch)
	}
}