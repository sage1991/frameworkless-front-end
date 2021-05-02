import { TodoList } from "./TodoList";
import { TodoFooter } from "./TodoFooter";
import { LifeCycle } from "./LifeCycle";
import { Todo } from "../model/Todo";
import { Filter } from "../model/Filter";


const TODO_APP_TEMPLATE = document.querySelector<HTMLTemplateElement>("#todo-app")!;

interface TodoAppState {
  todos: Todo[];
  filter: Filter;
}

export class TodoApp extends HTMLElement implements LifeCycle {
  private list: TodoList;
  private footer: TodoFooter;

  private state: TodoAppState = {
    todos: [],
    filter: Filter.ALL
  }

  connectedCallback() {
    requestAnimationFrame(() => {
      const content = TODO_APP_TEMPLATE.content.firstElementChild!.cloneNode(true);
      this.appendChild(content);

      this
        .querySelector<HTMLInputElement>(".new-todo")!
        .addEventListener("keypress", e => {
          const { key, target } = e;
          if (key === "Enter" && (<HTMLInputElement> target).value) {
            this.addItem((<HTMLInputElement> target).value);
            (<HTMLInputElement> target).value = "";
          }
      })

      this.footer = this.querySelector<TodoFooter>("todo-footer")!;
      this.list = this.querySelector<TodoList>("todo-list")!;
      this.list.addEventListener(TodoList.events.DELETE_ITEM, e => {
        const { detail } = <CustomEvent<number>> e;
        this.deleteItem(detail);
      });

      this.syncAttributes();
    });
  }

  private deleteItem = (index: number) => {
    this.state.todos = this.state.todos.filter((_, i) => i !== index);
    this.syncAttributes();
  }

  private addItem = (text: string) => {
    this.state.todos = [ ...this.state.todos, { text, completed: false } ];
    this.syncAttributes();
  }

  private syncAttributes = () => {
    this.list.todos = this.state.todos;
    this.footer.todos = this.state.todos;
    this.footer.filter = this.state.filter;
  }
}
