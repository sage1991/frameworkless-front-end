import { Router } from "express";
import { v4 } from "uuid";


interface TodoModel {
  id: string;
  completed: boolean;
  text: string;
}

const router = Router()
let todos: TodoModel[] = []

router.get("/api/todos", (request, response) => {
  response.send(todos)
})

router.post("/api/todos", (request, response) => {
  const todo: TodoModel = {
    ...request.body,
    id: v4(),
    completed: false,
  }
  todos = [ ...todos, todo ]

  response.status(201)
  response.send(todos)
})

router.patch("/api/todos/:id", (request, response) => {
  const { id } = request.params
  const index = todos.findIndex((value) => value.id === id)
  todos[index] = {
    ...todos[index],
    ...request.body
  }
  response.send(todos)
})

router.delete("/api/todos/:id", (request, response) => {
  const { id } = request.params
  todos = todos.filter((value) => value.id !== id)
  response.status(204)
  response.send()
})

export { router }
