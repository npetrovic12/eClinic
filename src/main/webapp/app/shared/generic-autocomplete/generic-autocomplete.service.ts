import { HttpClient } from '@angular/common/http';
import { createRequestOption } from '../util/request-util';
import { SERVER_API_URL } from 'app/app.constants';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericAutocompleteService {
  private resourceUrl = SERVER_API_URL;
  constructor(private http: HttpClient) {}

  getData(apiUrl: string, criteria: any) {
    const reqParams = createRequestOption(this.queryParams);
    return this.http.post(this.resourceUrl + apiUrl, criteria, {
      observe: 'response',
      params: reqParams
    });
  }

  private queryParams() {
    return {
      page: 0,
      size: 10,
      sort: 'id,desc'
    };
  }
}
