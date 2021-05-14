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
		limit: number,
		sortings: Array<ListSorting>,
		fetcher: ListFetcher | string,
		card: {component: typeof SvelteComponent, cardify: Function},
	) {
		if (typeof fetcher === "string") fetcher = new ListFetcher(fetcher);
		let config = new ListConfig(label, icon, [], limit, sortings, fetcher, card.component, card.cardify);
		return new List(config);
	}

	constructor(config: ListConfig) {
		this.config = config;
		this.sortingIndex = config.initialSortingIndex;
	}

	addAction(action: ListAction) {
		if (this.config.actions === null) this.config.actions = [];
		this.config.actions.push(action);
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






