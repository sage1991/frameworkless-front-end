import { AppEvents } from "./index";
import { AppState } from "./model";


export type Component = (target: HTMLElement, state: AppState, events: AppEvents) => HTMLElement;

export type EnhanceComponent = (Component: Component) => Component;

const enhanceComponent: EnhanceComponent = (Component) => (target, state, events) => {
  const element = Component(target, state, events)
  const children = element.querySelectorAll("[data-component]")

  children.forEach(child => {
    const { component } = (<HTMLElement> child).dataset;
    const ChildComponent = registry[component!];
    if (!ChildComponent) return;
    child.replaceWith(ChildComponent(<HTMLElement> child, state, events));
  })

  return element
}


export interface Registry {
  [key: string]: Component;
}

const registry: Registry = {}

export const addRegistry = (name: string, Component: Component) => {
  registry[name] = enhanceComponent(Component)
}


export const render = (root: HTMLElement, state: AppState, events: AppEvents) => {
  const RootComponent: Component = (root) => <HTMLElement> root.cloneNode(true)
  return enhanceComponent(RootComponent)(root, state, events);
}
