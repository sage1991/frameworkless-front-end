import { Todo } from "../model/Todo";
import { Component } from "../registry";


let template: HTMLTemplateElement;

const createNode = () => {
  if (!template) {
    template = document.querySelector<HTMLTemplateElement>("#todo-item")!;
  }

  return <HTMLLIElement> template.content.firstElementChild!.cloneNode(true);
}

const getTodoElement = (todo: Todo, index: number): HTMLLIElement => {
  const { text, completed } = todo;
  const element = createNode();

  element.querySelector<HTMLInputElement>("input.edit")!.value = text;
  element.querySelector<HTMLLabelElement>("label")!.textContent = text;

  if (completed) {
    element.classList.add("completed");
    element.querySelector<HTMLInputElement>("input.toggle")!.checked = true;
  }

  element
    .querySelector<HTMLButtonElement>("button.destroy")!
    .dataset
    .index = `${index}`;

  return element;
}


interface TodosViewState {
  todos: Todo[];
}

export const Todos: Component<TodosViewState> = (target, { todos }, events) => {
  const newTodosView = <HTMLElement> target.cloneNode(true);
  newTodosView.innerHTML = "";

  const fragment = document.createDocumentFragment();

  todos
    .map(getTodoElement)
    .forEach((element) => {
      fragment.appendChild(element);
    });


  newTodosView.appendChild(fragment);

  newTodosView.addEventListener("click", (e) => {
    const target = <HTMLElement> e.target;
    if (target.matches("button.destroy")) {
      events.deleteItem(+target.dataset.index!);
    }
  })

  return newTodosView;
}





