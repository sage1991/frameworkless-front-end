import { LifeCycle } from "./LifeCycle";
import { Todo } from "../model/Todo";


const LIST_TEMPLATE = document.querySelector<HTMLTemplateElement>("#todo-list")!;
const LIST_ITEM_TEMPLATE = document.querySelector<HTMLTemplateElement>("#todo-item")!;

const createList = (): HTMLUListElement => {
  return <HTMLUListElement> LIST_TEMPLATE.content.firstElementChild!.cloneNode(true);
}

const createListItem = (): HTMLLIElement => {
  return <HTMLLIElement> LIST_ITEM_TEMPLATE.content.firstElementChild!.cloneNode(true);
}

const convertToTodoElement = ({ text, completed }: Todo, index: number): HTMLLIElement => {
  const li = createListItem();

  li
    .querySelector<HTMLInputElement>("input.edit")!
    .value = text;

  li
    .querySelector<HTMLLabelElement>("label")!
    .textContent = text;

  if (completed) {
    li.classList.add("completed");
    li
      .querySelector<HTMLInputElement>("input.toggle")!
      .checked = true;
  }

  li
    .querySelector<HTMLButtonElement>("button.destroy")!
    .dataset
    .index = `${index}`;

  return li;
}


export class TodoList extends HTMLElement implements LifeCycle {
  static events = { DELETE_ITEM: "DELETE_ITEM" };
  private list: HTMLUListElement;

  // attribute
  static get observedAttributes(): string[] {
    return [ "todos" ];
  };

  get todos(): Todo[] {
    if (!this.hasAttribute("todos")) return [];
    return JSON.parse(this.getAttribute("todos")!);
  }

  set todos(value: Todo[]) {
    this.setAttribute("todos", JSON.stringify(value));
  }

  onDeleteClick(index: number) {
    const event = new CustomEvent(TodoList.events.DELETE_ITEM, { detail: index });
    this.dispatchEvent(event);
  }

  updateList() {
    this.list.innerHTML = "";
    const fragment = document.createDocumentFragment();
    this
      .todos
      .map(convertToTodoElement)
      .forEach(element => fragment.appendChild(element))

    this.list.appendChild(fragment);
  }

  connectedCallback() {
    this.list = createList();
    this.appendChild(this.list);

    this.list.addEventListener("click", (e) => {
      const { target } = e;
      if ((<HTMLElement> target).matches("button.destroy")) {
        const { index } = (<HTMLElement> target).dataset;
        if (index) this.onDeleteClick(+index);
      }
    });

    this.updateList();
  }

  attributeChangedCallback() {
    this.updateList();
  }
}

