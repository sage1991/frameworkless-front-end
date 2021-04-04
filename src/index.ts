import getTodos from "./getTodos";
import { Filter } from "./model/Filter";
import { addRegistry, render } from "./registry";
import counter from "./view/counter";
import todos from "./view/todos";
import filters from "./view/filters";
import app from "./view/app";
import { diff } from "./rendering/diff";



addRegistry("app", app);
addRegistry("counter", counter);
addRegistry("todos", todos);
addRegistry("filters", filters);


const state = {
  todos: getTodos(),
  filter: Filter.ACTIVE
}

const events = {
  deleteItem: (index: number) => {
    state.todos.splice(index, 1);
    renderDOM();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false
    });
    renderDOM();
  }
}

const renderDOM = () => {
  window.requestAnimationFrame(() => {
    const root = document.querySelector<HTMLElement>("#root")!;
    const newMain = render(root, state, events);
    diff(document.body, root, newMain);
  });
}

renderDOM();
