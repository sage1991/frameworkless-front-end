import { Todo } from "../model/Todo";


interface TodosViewState {
  todos: Todo[];
}


let template: HTMLTemplateElement;

const createNode = () => {
  if (!template) {
    template = document.querySelector<HTMLTemplateElement>("#todo-item")!;
  }

  return <HTMLLIElement> template.content.firstElementChild!.cloneNode(true);
}


const getTodoElement = (todo: Todo): HTMLLIElement => {
  const { text, completed } = todo;
  const element = createNode();

  element.querySelector<HTMLInputElement>("input.edit")!.value = text;
  element.querySelector<HTMLLabelElement>("label")!.textContent = text;

  if (completed) {
    element.classList.add("completed");
    element.querySelector<HTMLInputElement>("input.toggle")!.checked = true;
  }

  return element;
}


export default (target: HTMLElement, state: TodosViewState) => {
  const { todos } = state;

  const newTodosView = <HTMLElement> target.cloneNode(true);
  const fragment = document.createDocumentFragment();

  todos.map(getTodoElement)
       .forEach((element) => {
         fragment.appendChild(element);
       });

  newTodosView.innerHTML = "";
  newTodosView.appendChild(fragment);

  return newTodosView;
}





