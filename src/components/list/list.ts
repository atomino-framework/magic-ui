import ListConfig from "./list-config";
import {ListSorting, ListAction} from "./list-config";
import ListFetcher from "./list-fetcher"
import {SvelteComponent} from "svelte";

export default class List {

	public config: ListConfig;
	public initialised: boolean = false;
	public items: Array<any> = [];
	public count: number = 0;
	public page: number = 1;
	public pageCount: number = 1;
	public quickSearch: string | null = null;
	public sortingIndex: number;

	static create(
		label: string,
		icon: string,
		actions: Array<ListAction>,
		limit: number,
		sortings: Array<ListSorting>,
		fetcher: ListFetcher,
		card: typeof SvelteComponent,
		cardify: Function
	) {
		let config = new ListConfig(label, icon, actions, limit, sortings, fetcher, card, cardify);
		return new List(config);
	}

	constructor(config: ListConfig) {
		this.config = config;
		this.sortingIndex = config.initialSortingIndex;
	}

	reload(): Promise<any> { return this.loadData(); }

	loadData(): Promise<any> {
		this.initialised = true;
		return this.config.fetcher.list(
			this.page,
			this.config.sorting[this.sortingIndex],
			this.quickSearch,
			{},
			this.config.limit
		).then(result => {
			this.count = result.count;
			this.page = result.page;
			this.pageCount = Math.ceil(result.count / this.config.limit)
			this.items.length = 0;
			this.items.push(...result.items.map((item) => this.config.cardify(item)));
		});
	}
}






