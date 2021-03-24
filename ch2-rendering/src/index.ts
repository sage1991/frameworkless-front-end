import getTodos from "./getTodos";
import { Filter } from "./model/Filter";
import { ViewState } from "./view";
import { addRegistry, render } from "./registry";
import counter from "./view/counter";
import todos from "./view/todos";
import filters from "./view/filters";
import { diff } from "./rendering/diff";




addRegistry("counter", counter);
addRegistry("todos", todos);
addRegistry("filters", filters);


const state: ViewState = {
  todos: getTodos(),
  filter: Filter.ACTIVE
}

window.requestAnimationFrame(() => {
  const main = document.querySelector(".todoapp") as HTMLElement;
  const newMain = render(main, state);
  diff(document.body, main, newMain);
});
