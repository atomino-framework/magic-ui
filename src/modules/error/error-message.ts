export default class ErrorMessage extends Error{
    constructor(message, public info:string = '') {
        super(message);
    }
}