export interface RequestConfig {
  url: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data?: object;
  params?: HttpParams;
  headers?: HttpHeaders;
}

export interface HttpHeaders {
  [key: string]: string;
}

export interface HttpParams {
  [key: string]: string;
}

export interface HttpResponse<T = any> {
  status: number;
  data: T;
}

export type Request = <T> (config: RequestConfig) => Promise<HttpResponse<T>>
