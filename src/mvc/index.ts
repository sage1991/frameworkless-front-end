import { addRegistry, render } from "./registry";
import { diff } from "./rendering/diff";
import { Filter } from "./model/Filter";
import { Counter } from "./component/counter";
import { App } from "./component/app";
import { Todos } from "./component/todos";
import { Filters } from "./component/filters";
import { AppState, modelFactory } from "./model";


export interface AppEvents {
  addItem: (text: string) => void;
  updateItem: (index: number, text: string) => void;
  deleteItem: (index: number) => void;
  toggleCompleted: (index: number) => void;
  completeAll: () => void;
  clearCompleted: () => void;
  changeFilter: (filter: Filter) => void;
}


addRegistry("app", App)
addRegistry("counter", Counter)
addRegistry("todos", Todos)
addRegistry("filters", Filters)


const loadState = () => {
  const serialized = localStorage.getItem("state")
  if (!serialized) return undefined
  return JSON.parse(serialized)
}

const model = modelFactory(loadState())

const { subscribe, ...rest } = model
const events: AppEvents = { ...rest }

const renderDOM = (state: AppState) => {
  requestAnimationFrame(() => {
    const root = document.querySelector<HTMLElement>("#root")!
    const newMain = render(root, state, events)
    diff(document.body, root, newMain)
  })
}

subscribe(renderDOM)

subscribe((state) => {
  queueMicrotask(() => {
    localStorage.setItem("state", JSON.stringify(state))
  })
})
