import { Component } from "../registry";
import { AppEvents } from "../index";
import { AppState } from "../model";
import { Todo } from "../model/Todo";


let template: HTMLTemplateElement;
const createNode = () => {
  if (!template) {
    template = document.querySelector<HTMLTemplateElement>("#todo-app")!
  }
  return <HTMLElement> template.content.firstElementChild!.cloneNode(true);
}


export const App: Component = (app: HTMLElement, state: AppState, events: AppEvents) => {
  const newApp = <HTMLElement> app.cloneNode(true);
  newApp.innerHTML = "";
  newApp.appendChild(createNode());

  if (isCompletedPresent(state.todos)) {
    newApp
      .querySelector(".clear-completed")!
      .classList
      .remove("hidden")
  } else {
    newApp
      .querySelector(".clear-completed")!
      .classList
      .add("hidden")
  }

  newApp
    .querySelector<HTMLInputElement>("input.toggle-all")!
    .checked = isAllTodosCompleted(state.todos)

  addEvent(newApp, events);

  return newApp;
}


const isCompletedPresent = (todos: Todo[]) => {
  return todos.some(todo => todo.completed)
}


const isAllTodosCompleted = (todos: Todo[]) => {
  return !todos.some(todo => !todo.completed)
}


const addEvent = (target: HTMLElement, events: AppEvents) => {
  const { clearCompleted, completeAll, addItem } = events

  target
    .querySelector<HTMLInputElement>(".new-todo")!
    .addEventListener("keypress", (e) => {
      if (e.key !== "Enter") return
      const input = <HTMLInputElement> e.target
      const { value } = input
      addItem(value)
      input.value = ""
    })

  target
    .querySelector<HTMLInputElement>("input.toggle-all")!
    .addEventListener("click", completeAll)

  target
    .querySelector<HTMLButtonElement>(".clear-completed")!
    .addEventListener("click", clearCompleted)
}
