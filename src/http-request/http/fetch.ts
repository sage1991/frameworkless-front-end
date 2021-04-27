import { HttpParams, RequestConfig, HttpResponse, Request } from "./index"


export const request: Request = async <T> (config: RequestConfig): Promise<HttpResponse<T>> => {
  const { url, method, headers, data, params } = config

  const response = await fetch(`${url}${stringifyParams(params)}`, {
    method,
    body: data ? JSON.stringify(data) : undefined,
    headers: new Headers(headers),
  })

  return parse<T>(response)
}

const stringifyParams = (params?: HttpParams): string => {
  if (!params) return ""

  const query = Object
    .entries(params)
    .map(([ name, value ]) => `${name}=${value}`)
    .join("&")

  return `?${encodeURI(query)}`
}

const parse = async <T> (response: Response): Promise<HttpResponse<T>> => {
  const { status } = response

  let data: any = null
  if (status !== 204) {
    data = await response.json()
  }

  return { status, data }
}
