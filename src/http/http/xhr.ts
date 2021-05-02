import { HttpParams, RequestConfig, HttpResponse, HttpHeaders, Request } from "./index"


export const request: Request = <T> (config: RequestConfig): Promise<HttpResponse<T>> => {
  return new Promise<HttpResponse<T>>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.timeout = 20000
    const { url, method, params, data, headers } = config

    xhr.open(method, `${url}${stringifyParams(params)}`)

    setHeaders(xhr, headers)

    xhr.send(JSON.stringify(data))

    xhr.onerror = reject
    xhr.ontimeout = reject
    xhr.onload = () => resolve(parse<T>(xhr))
  })
}

const stringifyParams = (params?: HttpParams): string => {
  if (!params) return ""

  const query = Object
    .entries(params)
    .map(([ name, value ]) => `${name}=${value}`)
    .join("&")
  return `?${encodeURI(query)}`
}

const setHeaders = (xhr: XMLHttpRequest, headers?: HttpHeaders): void => {
  if (!headers) return

  Object.entries(headers).forEach(([ name, value ]) => {
    xhr.setRequestHeader(name, value)
  })
}

const parse = <T> (xhr: XMLHttpRequest): HttpResponse<T> => {
  const { status, responseText } = xhr

  let data: any = null
  if (status !== 204) {
    data = JSON.parse(responseText)
  }

  return { status, data }
}
