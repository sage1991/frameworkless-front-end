import * as todos from "./todos"
import { HttpResponse } from "./http"


const NEW_TODO_TEXT = "A simple todo element"

const printResult = (action: string, result: HttpResponse) => {
  const time = new Date().toTimeString()

  const p = document.createElement("p")
  p.textContent = `${action}: ${JSON.stringify(result)} (${time})`

  document.querySelector("div")!
          .appendChild(p)
}


const onListClick = async () => {
  const result = await todos.list()
  printResult("list todos", result)
}


const onAddClick = async () => {
  const result = await todos.create(NEW_TODO_TEXT)
  printResult("add todo", result)
}


const onUpdateClick = async () => {
  const { data } = await todos.list()
  const result = await todos.update({ ...data[0], completed: true })
  printResult("update todo", result)
}


const onDeleteClick = async () => {
  const { data } = await todos.list()
  const result = await todos.remove(data[0].id)
  printResult("delete todo", result)
}


document.querySelector("button[data-list]")!
        .addEventListener("click", onListClick)

document.querySelector("button[data-add]")!
        .addEventListener("click", onAddClick)

document.querySelector("button[data-update]")!
        .addEventListener("click", onUpdateClick)

document.querySelector("button[data-delete]")!
        .addEventListener("click", onDeleteClick)
