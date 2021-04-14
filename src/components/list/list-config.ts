import {SvelteComponent} from "svelte";
import ListFetcher from "./list-fetcher"

export interface IListSorting {
	readonly label: string;
	readonly initial: boolean;
	readonly fields: string | Array<any>;
	readonly order: string;
}

export class ListSorting {
	readonly initial: boolean = false;
	readonly twoWay: boolean = false;
	readonly fields: Array<{ field: string, order: number }> = []
	readonly key: string | null = null;
	readonly label: string;

	constructor(label: string, twoWay: boolean = true, initial: boolean = false, key: string | null = null) {
		this.label = label;
		this.twoWay = twoWay;
		this.initial = initial;
		this.key = key;
	}

	asc(field: string): ListSorting {
		this.fields.push({field, order: +1});
		return this;
	}
	desc(field: string): ListSorting {
		this.fields.push({field, order: -1});
		return this;
	}

	get(): Array<IListSorting> {
		let order = [{
			label: this.label,
			order: 'asc',
			fields: this.key ? this.key + '-asc' : this.fields.map(item => [item.field, (item.order === 1 ? 'asc' : 'desc')]),
			initial: this.initial
		}];
		if (this.twoWay) order.push({
			label: this.label,
			order: 'desc',
			fields: this.key ? this.key + '-desc' : this.fields.map(item => [item.field, (item.order === 1 ? 'desc' : 'asc')]),
			initial: false
		});
		return order;
	}
}

export class ListAction {constructor(public icon: string, public label: string, public onClick: (item) => void) {}}

export default class ListConfig {

	static Sorting(label: string, twoWay: boolean = true, initial: boolean = false, key: string | null = null): ListSorting {return new ListSorting(label, twoWay, initial, key)};
	static Action(icon: string, label: string, onClick: (item) => void): ListAction {return new ListAction(icon, label, onClick)};

	public sorting: Array<IListSorting> = [];
	public initialSortingIndex: number;

	constructor(
		public label: string,
		public icon: string,
		public actions: Array<ListAction> | null,
		public limit: number,
		sortings: Array<ListSorting>,
		public fetcher: ListFetcher,
		public card: typeof SvelteComponent,
		public cardify: Function
	) {
		sortings.forEach(sorting => this.sorting.push(...sorting.get()));
		let initialSortingIndex = this.sorting.findIndex(item => item.initial);
		this.initialSortingIndex = initialSortingIndex > -1 ? initialSortingIndex : 0;
	}
}