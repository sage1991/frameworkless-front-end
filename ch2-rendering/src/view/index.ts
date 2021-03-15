import { Todo } from "../model/Todo";
import { Filter } from "../model/Filter";
import todosView from "./todos";
import counterView from "./counter";
import filtersView from "./filters";


export interface ViewState {
  filter: Filter;
  todos: Todo[];
}

export default (target: HTMLElement, state: ViewState) => {
  const { filter, todos } = state;

  const element = target.cloneNode(true) as HTMLElement;
  const list = element.querySelector(".todo-list") as HTMLElement;
  const counter = element.querySelector(".todo-count") as HTMLElement;
  const filters = element.querySelector(".filters") as HTMLElement;

  list.replaceWith(todosView(list, { todos }));
  counter.replaceWith(counterView(counter, { todos }));
  filters.replaceWith(filtersView(filters, { filter }));

  return element;
}
