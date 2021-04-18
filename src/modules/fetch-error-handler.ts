import ErrorUnauhtorized from "./error/error-unauhtorized";
import ErrorForbidden from "./error/error-forbidden";
import ErrorMessage from "./error/error-message";
import ErrorNotFound from "./error/error-not-found";
import ErrorValidation from "./error/error-validation";

export default function handleFetch(response:Response) {
    switch (response.status) {
        case 200:
            return response.json().catch((e)=>{throw new ErrorMessage("Some error occurred (" + response.status + ")", response.url)});
        case 401:
            throw new ErrorUnauhtorized(response);
        case 403:
            throw new ErrorForbidden(response);
        case 404:
            throw new ErrorNotFound(response);
        case 422:
            throw new ErrorValidation(response);
        case 499:
            throw new ErrorMessage(response.statusText);
        default:
            throw new ErrorMessage("Some error occurred (" + response.status + ")", response.url);
    }
}