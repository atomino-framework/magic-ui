export default class ErrorValidation extends Error{
	constructor(public response:Response) {super();}
}