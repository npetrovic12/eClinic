import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IUser } from './user.model';
import { catchError } from 'rxjs/operators';
import { IRestError } from '../models/rest.model';
import { RestUtils } from '../utils/rest-utils';
import { UserCriteria } from 'app/admin/user-management/user.criteria';

@Injectable({ providedIn: 'root' })
export class UserService {
  public resourceUrl = SERVER_API_URL + 'api/users';

  constructor(private http: HttpClient) {}

  create(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.resourceUrl, user).pipe(
      catchError(err => {
        console.log('HTTP Error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  update(user: IUser): Observable<IUser> {
    return this.http.put<IUser>(this.resourceUrl, user).pipe(
      catchError(err => {
        console.log('HTTP Error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  filter(params?: any, searchText?: string): Observable<HttpResponse<IUser[]>> {
    const reqParams = createRequestOption(params);
    const criteria = new UserCriteria(searchText);
    return this.http.post<IUser[]>(this.resourceUrl + '/filter', criteria, { observe: 'response', params: reqParams }).pipe(
      catchError(err => {
        console.log('HTTP Error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.resourceUrl + '/' + id).pipe(
      catchError(err => {
        console.log('HTTP Error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  authorities(): Observable<string[]> {
    return this.http.get<string[]>(SERVER_API_URL + 'api/users/authorities').pipe(
      catchError(err => {
        console.log('HTTP Error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  find(login: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.resourceUrl}/${login}`);
  }

  query(req?: any): Observable<HttpResponse<IUser[]>> {
    const options = createRequestOption(req);
    return this.http.get<IUser[]>(this.resourceUrl, { params: options, observe: 'response' });
  }
}
