import { Todo } from "../model/Todo";
import { Filter } from "../model/Filter";
import { LifeCycle } from "./LifeCycle";


const convertToCount = (todos: Todo[]) => {
  const notCompleted = todos.filter(todo => !todo.completed);
  const { length } = notCompleted;

  if (length === 1) return '1 Item left';
  return `${length} Items left`;
}


export class TodoFooter extends HTMLElement implements LifeCycle {
  static get observedAttributes(): string[] {
    return [ "todos", "filter" ];
  }

  get todos() {
    const todos = this.getAttribute("todos");
    if (todos) {
      return JSON.parse(todos);
    }
    return [];
  }

  set todos(todos: Todo[]) {
    this.setAttribute("todos", JSON.stringify(todos));
  }

  get filter() {
    return <Filter> this.getAttribute("filter");
  }

  set filter(filter: Filter) {
    this.setAttribute("filter", filter);
  }

  updateView() {
    const { filter, todos } = this;

    this
      .querySelectorAll("li a")
      .forEach(a => {
        if (a.textContent === filter) {
          a.classList.add("selected");
        } else {
          a.classList.remove("selected");
        }
      });

    this
      .querySelector("span.todo-count")!
      .textContent = convertToCount(todos);
  }

  connectedCallback() {
    const template = document.querySelector<HTMLTemplateElement>("#footer")!;
    const content = template
      .content
      .firstElementChild!
      .cloneNode(true);
    this.appendChild(content);
    this.updateView();
  }

  attributeChangedCallback() {
    this.updateView();
  }
}
