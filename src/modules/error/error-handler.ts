import toastManager from "../../elements/toast-manager";
import ErrorUnauhtorized from "./error-unauhtorized";
import ErrorForbidden from "./error-forbidden";
import {user} from "../store";
import ErrorMessage from "./error-message";
import ErrorNotFound from "./error-not-found";
import ErrorValidation from "./error-validation";

export default class ErrorHandler {
	private static _registered = false;

	static register(): void {
		if (!this._registered) {
			window.addEventListener("unhandledrejection", e => this.handle(e.reason))
			window.addEventListener("error", e => this.handle(e.error))
			this._registered = true;
		}
	}

	static handle(error: Error) {
		if (error instanceof ErrorUnauhtorized) {
			toastManager.error("Not authenticated", "You must log in to continue");
			fetch('/api/auth/logout').then(() => user.set(null));
		} else if (error instanceof ErrorForbidden) {
			toastManager.error("You dont have permission for the requested resource!", error.message)
		} else if (error instanceof ErrorMessage) {
			toastManager.error(error.message, error.info);
		} else if (error instanceof ErrorNotFound) {
			toastManager.error('The requested resource can not be found!');
		} else if (error instanceof ErrorValidation) {
			toastManager.error('Validation Error!');
		} else {
			toastManager.error("Some unknown error occurred: ", error.message)
		}
	}
}

