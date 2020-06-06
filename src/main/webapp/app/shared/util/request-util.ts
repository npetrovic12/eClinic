import { HttpParams } from '@angular/common/http';
/* eslint-disable no-prototype-builtins, prefer-const */
export const createRequestOption = (req?: any): HttpParams => {
  let options: HttpParams = new HttpParams();

  for (let key in req) {
    if (req.hasOwnProperty(key)) {
      options = options.append(key, req[key]);
    }
  }

  return options;
};
