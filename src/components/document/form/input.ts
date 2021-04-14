export default class Input {
	static component: any;

	public hint: string;
	public properties = {}
	public inlineLabel = true;


	constructor(public field: string, public label: string | null = null) {
		this.label = this.label !== null ? this.label : this.field;
	}

	get compact(){
		this.inlineLabel = true;
		return this;
	}
	get wide(){
		this.inlineLabel = false;
		return this;
	}

	get component(): typeof Input {
		return Object.getPrototypeOf(this).constructor.component
	}

	addHint(hint: string): this {
		this.hint = hint;
		return this;
	}
}