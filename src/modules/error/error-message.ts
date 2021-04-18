export default class ErrorMessage extends Error{
    constructor(message:any, public info:string = '') {
        super(message);
    }
}