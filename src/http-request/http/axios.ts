import { HttpResponse, Request, RequestConfig } from "./index";
import axios from "axios";

export const request: Request = <T> (config: RequestConfig): Promise<HttpResponse<T>> => {
  return (
    axios
      .request({
        ...config
      })
      .then(({ data, status }) => ({ status, data }))
  )
}
