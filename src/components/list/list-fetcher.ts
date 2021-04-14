import handleFetch from "../../modules/fetch-error-handler";
import {IListSorting} from "./list-config";

export default class ListFetcher {

	constructor(protected api: string) {}

	list(page: number, sort: IListSorting, quickSearch: string, search: Object, limit: number): Promise<ListFetcherResult> {
		return fetch(this.api + '/list/' + page, {
				method: 'POST',
				body: JSON.stringify({sort: sort.fields, quickSearch, search, limit})
			}
		)
			.then(res => handleFetch(res))
			.then(res => new ListFetcherResult(res.page, res.count, res.items))
	}
}

export class ListFetcherResult {
	constructor(readonly page: number, readonly count: number, readonly items: Array<Object>) {}
}