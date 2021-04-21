import { Todo } from "../model/Todo";
import { Component } from "../registry";


interface CounterViewState {
  todos: Todo[];
}

export const Counter: Component<CounterViewState> = (target, { todos }) => {
  const newCounterView = target.cloneNode(true) as HTMLElement;
  newCounterView.textContent = getTodosCount(todos);
  return newCounterView;
}

const getTodosCount = (todos: Todo[]) => {
  const { length } = todos.filter((todo) => !todo.completed);

  if (length <= 1) {
    return `${length} item left`;
  }
  return `${length} items left`;
}
