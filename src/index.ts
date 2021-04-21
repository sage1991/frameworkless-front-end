import { addRegistry, render } from "./registry";
import { diff } from "./rendering/diff";
import { Filter } from "./model/Filter";
import { Counter } from "./view/counter";
import { App } from "./view/app";
import { Todos } from "./view/todos";
import { Filters } from "./view/filters";
import getTodos from "./getTodos";


addRegistry("app", App);
addRegistry("counter", Counter);
addRegistry("todos", Todos);
addRegistry("filters", Filters);


const state = {
  todos: getTodos(),
  filter: Filter.ALL
}

const events = {
  deleteItem: (index: number) => {
    state.todos = state.todos.filter((_, i) => i !== index);
    renderDOM();
  },
  addItem: (text: string) => {
    state.todos = [ ...state.todos, { text, completed: false } ];
    renderDOM();
  }
}

const renderDOM = () => {
  requestAnimationFrame(() => {
    const root = document.querySelector<HTMLElement>("#root")!;
    const newMain = render(root, state, events);
    diff(document.body, root, newMain);
  });
}

renderDOM();
