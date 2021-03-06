export default class Input {
	static component: any;

	public hint: string|null = null;
	public properties = {}
	public inlineLabel = true;


	constructor(public field: string|{field: string, label:string}, public label: string | null = null) {
		if(typeof field === "object"){
			this.label = this.label ?? field.label;
			this.field = field.field;
		}else{
			this.label = this.label !== null ? this.label : this.field.toString();
		}
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