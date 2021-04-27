import { addRegistry, render } from "./registry";
import { diff } from "./rendering/diff";
import { Filter } from "./model/Filter";
import { Counter } from "./component/counter";
import { App } from "./component/app";
import { Todos } from "./component/todos";
import { Filters } from "./component/filters";
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
