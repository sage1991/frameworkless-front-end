import { Todo } from "./Todo";
import { Filter } from "./Filter";
import { observableFactory } from "./observable";


export interface AppState {
  todos: Todo[];
  filter: Filter;
}

const INITIAL_STATE: AppState = {
  todos: [],
  filter: Filter.ALL
}

export const modelFactory = (init: AppState = INITIAL_STATE) => {
  const { state, subscribe } = observableFactory(init)

  const addItem = (text: string) => {
    if (!text) return
    state.todos = [ ...state.todos, { text, completed: false } ]
  }

  const updateItem = (index: number, text: string) => {
    if (!text || index < 0 || !state.todos[index]) return
    state.todos = state.todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          text
        }
      }
      return { ...todo }
    })
  }

  const deleteItem = (index: number) => {
    if (index < 0 || !state.todos[index]) return
    state.todos = state.todos.filter((todo, i) => i !== index)
  }

  const toggleCompleted = (index: number) => {
    if (index < 0 || !state.todos[index]) return
    state.todos = state.todos.map((todo, i) => {
      if (i !== index) return { ...todo }
      return {
        ...todo,
        completed: !todo.completed
      }
    })
  }

  const completeAll = () => {
    state.todos = state.todos.map((todo, i) => {
      return {
        ...todo,
        completed: true
      }
    })
  }

  const clearCompleted = () => {
    state.todos = state.todos.filter(todo => !todo.completed)
  }

  const changeFilter = (filter: Filter) => {
    state.filter = filter
  }

  return {
    addItem,
    updateItem,
    deleteItem,
    toggleCompleted,
    completeAll,
    clearCompleted,
    changeFilter,
    subscribe
  }
}
