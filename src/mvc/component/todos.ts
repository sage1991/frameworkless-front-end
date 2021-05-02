import { Todo } from "../model/Todo";
import { Component } from "../registry";
import { Filter } from "../model/Filter";
import { AppEvents } from "../index";


let template: HTMLTemplateElement;

const createTodoNode = () => {
  if (!template) {
    template = document.querySelector<HTMLTemplateElement>("#todo-item")!;
  }

  return <HTMLLIElement> template.content.firstElementChild!.cloneNode(true);
}

const convertToTodoElement = (todo: Todo, index: number, events: AppEvents): HTMLLIElement => {
  const { text, completed } = todo;
  const element = createTodoNode();

  element.querySelector<HTMLInputElement>("input.edit")!.value = text
  element.querySelector<HTMLLabelElement>("label")!.textContent = text

  if (completed) {
    element.classList.add("completed")
    element.querySelector<HTMLInputElement>("input.toggle")!.checked = true
  }

  addEventsToElement(element, index, events)

  return element
}

const addEventsToElement = (element: HTMLLIElement, index: number, events: AppEvents) => {
  const { deleteItem, toggleCompleted, updateItem } = events

  element
    .querySelector<HTMLButtonElement>("button.destroy")!
    .addEventListener("click", () => deleteItem(index))

  element
    .querySelector<HTMLInputElement>("input.toggle")!
    .addEventListener("click", () => toggleCompleted(index))

  element
    .addEventListener("dblclick", () => {
      element.classList.add("editing")
      element
        .querySelector<HTMLInputElement>("input.edit")!
        .focus()
    })

  element
    .querySelector<HTMLInputElement>("input.edit")!
    .addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return
      const { value } = <HTMLInputElement> e.target
      element.classList.remove("editing")
      updateItem(index, value)
    })
}


export const Todos: Component = (target, state, events) => {
  const { todos, filter } = state

  const newTodosView = <HTMLElement> target.cloneNode(true)
  newTodosView.innerHTML = "";

  const filteredTodos = filterTodos(todos, filter)

  const fragment = document.createDocumentFragment();
  filteredTodos
    .map((todo, index) => convertToTodoElement(todo, index, events))
    .forEach((element) => {
      fragment.appendChild(element);
    })
  newTodosView.appendChild(fragment)

  return newTodosView;
}


const filterTodos = (todos: Todo[], filter: Filter) => {
  return todos.filter((todo) => {
    switch (filter) {
      case Filter.ACTIVE:
        return !todo.completed
      case Filter.COMPLETED:
        return todo.completed
      case Filter.ALL:
      default:
        return true
    }
  })
}



