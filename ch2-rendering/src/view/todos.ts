import { Todo } from "../model/Todo";


interface TodosViewState {
  todos: Todo[];
}

export default (target: HTMLElement, state: TodosViewState) => {
  const { todos } = state;

  const newTodosView = target.cloneNode(true) as HTMLElement;
  const todoHtml = todos.map(getTodoElement).join("");
  newTodosView.innerHTML = todoHtml;

  return newTodosView;
}


const getTodoElement = (todo: Todo) => {
  const { text, completed } = todo;

  return (`
    <li class="${completed ? "completed" : ""}">
        <div class="view">
            <input id="toggle-${text}" class="toggle" type="checkbox" checked="${completed}" />
            <label for="toggle-${text}">${text}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" type="text" value="${text}">
    </li>
  `);
}


