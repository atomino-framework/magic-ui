export default class ErrorNotFound extends Error{
	constructor(public response:Response) {super();}
}