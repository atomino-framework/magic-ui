export default class ErrorUnauhtorized extends Error{
	constructor(public response:Response) {super();}
}