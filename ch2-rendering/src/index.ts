import getTodos from "./getTodos";
import { Filter } from "./model/Filter";
import view, { ViewState } from "./view";



const state: ViewState = {
  todos: getTodos(),
  filter: Filter.ALL
}

const main = document.querySelector(".todoapp") as HTMLElement;

window.requestAnimationFrame(() => {
  const newMain = view(main, state);
  main.replaceWith(newMain);
})
