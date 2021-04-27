// import { request } from "./http/xhr"
// import { request } from "./http/fetch"
import { request } from "./http/axios"

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const HEADERS = {
  'Content-Type': 'application/json'
}

const BASE_URL = 'http://localhost:8000/api/todos'

export const list = () => request<Todo[]>({
  url: BASE_URL,
  method: "GET"
})

export const create = (text: string) => request<Todo[]>({
  url: BASE_URL,
  method: "POST",
  data: { text },
  headers: HEADERS
})

export const update = (todo: Todo) => request<Todo[]>({
  url: `${BASE_URL}/${todo.id}`,
  method: "PATCH",
  data: todo,
  headers: HEADERS
})

export const remove = (id: string) => request<void>({
  url: `${BASE_URL}/${id}`,
  method: "DELETE"
})
