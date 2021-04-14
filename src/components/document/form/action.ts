import FormDoc from "./doc";

export default class FormAction {
	constructor(
		public icon: string,
		public label: string,
		public onClick: (doc:FormDoc) => void,
		public active: (doc:FormDoc)=>boolean = (doc:FormDoc)=>true) {
	}
}
