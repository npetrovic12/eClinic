import { IRestError, RestError } from '../models/rest.model';

export class RestUtils {
  public static formRestErrorObject(error): IRestError {
    const restError: IRestError = new RestError();
    restError.status = error.status;
    restError.statusText = error.statusText;
    restError.message = error.message;
    restError.translationPath = 'error.rest.' + String(restError.status);

    return restError;
  }
}
