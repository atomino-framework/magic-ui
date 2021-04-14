import Input from "./input";

export default class Section {
	public inputs: Array<Input> = [];
	constructor(public label: string, public wide: boolean) {}
	add(...inputs: Array<Input>) {
		inputs.forEach(input => this.inputs.push(input));
		return this;
	}
}