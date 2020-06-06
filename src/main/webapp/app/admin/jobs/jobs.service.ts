import { Injectable } from '@angular/core';
import { SERVER_API_URL } from 'app/app.constants';
import { JobsCriteria } from './jobs.criteria';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { IRestResponse, RestResponse, IRestError } from 'app/core/models/rest.model';
import { Job } from './job.model';
import { RestUtils } from 'app/core/utils/rest-utils';
import { throwError } from 'rxjs';
import { createRequestOption } from 'app/shared/util/request-util';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  private resourceUrl = SERVER_API_URL + 'api/jobs';

  constructor(private http: HttpClient) {}

  filter(params?: any, title?: string, description?: string, bookable?: boolean, searchText?: string) {
    console.log('service');
    const criteria = new JobsCriteria(title, description, bookable, searchText);
    console.log(params);
    const reqParams = createRequestOption(params);
    return this.http.post(this.resourceUrl + '/filter', criteria, { observe: 'response', params: reqParams }).pipe(
      map(res => {
        const result: any = res.body;
        const response: IRestResponse = new RestResponse();
        response.totalItems = +res.headers.get('X-Total-Count');
        response.data = result.map(job => Object.assign(new Job(), job));
        return response;
      }),
      catchError(err => {
        console.log('HTTP Error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  create(job: Job) {
    return this.http.post(this.resourceUrl, job, { observe: 'response' }).pipe(
      map(res => {
        const response: IRestResponse = new RestResponse();
        response.data = Object.assign(new Job(), res.body);
        return response;
      }),
      catchError(err => {
        console.log('HTTP error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  update(job: Job) {
    return this.http.put(this.resourceUrl, job, { observe: 'response' }).pipe(
      map(res => {
        const response: IRestResponse = new RestResponse();
        response.data = Object.assign(new Job(), res.body);
        return response;
      }),
      catchError(err => {
        console.log('HTTP error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }

  delete(id: string) {
    return this.http.delete(this.resourceUrl + '/' + id, { observe: 'response' }).pipe(
      map(() => {
        const response: IRestResponse = new RestResponse();
        return response;
      })
    );
  }

  get(id: string) {
    return this.http.get(this.resourceUrl + '/' + id, { observe: 'response' }).pipe(
      map(res => {
        const response: IRestResponse = new RestResponse();
        response.data = Object.assign(new Job(), res.body);
        return response;
      }),
      catchError(err => {
        console.log('HTTP Error', err);
        const error: IRestError = RestUtils.formRestErrorObject(err);
        return throwError(error);
      })
    );
  }
}
