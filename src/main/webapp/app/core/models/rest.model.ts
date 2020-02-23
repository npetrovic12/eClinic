export interface IRestResponse {
  totalItems?: number;
  page?: number;
  size?: number;
  sortOrder?: string;
  dataType?: string;
  data?: any;
  url?: string;
}

export interface IRestError {
  status?: number;
  statusText?: string;
  message?: string;
  translationPath?: string;
  url?: string;
}

export class RestResponse implements IRestResponse {
  constructor(
    public totalItems?: number,
    public page?: number,
    public size?: number,
    public sortOrder?: string,
    public dataType?: string,
    public data?: any,
    public url?: string
  ) {
    this.totalItems = totalItems ? totalItems : null;
    this.page = page ? page : null;
    this.size = size ? size : null;
    this.sortOrder = sortOrder ? sortOrder : null;
    this.dataType = dataType ? dataType : null;
    this.data = data ? data : null;
    this.url = url ? url : null;
  }
}

export class RestError implements RestError {
  constructor(
    public status?: number,
    public statusText?: string,
    public message?: string,
    public translationPath?: string,
    public url?: string
  ) {
    this.status = status ? status : null;
    this.statusText = statusText ? statusText : null;
    this.message = message ? message : null;
    this.translationPath = translationPath ? translationPath : null;
    this.url = url ? url : null;
  }
}
