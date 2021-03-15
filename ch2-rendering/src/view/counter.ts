import { Todo } from "../model/Todo";


interface CounterViewState {
  todos: Todo[];
}

export default (target: HTMLElement, { todos }: CounterViewState) => {
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
