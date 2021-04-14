export default class ErrorForbidden extends Error{
	constructor(public response:Response) {super();}
}