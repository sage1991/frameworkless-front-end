import { ViewState } from "./view";

type Component = (target: HTMLElement, state: ViewState) => HTMLElement;

interface Registry {
  [key: string]: Component | undefined;
}

const registry: Registry = {};

export const addRegistry = (name: string, component: Component) => {
  registry[name] = component;
}


type RenderWithComponent = (component: Component) => Component;

const renderWithComponent: RenderWithComponent = (component) => (target, state) => {
  const element = component(target, state);
  const children = element.querySelectorAll("[data-component]");

  Array.prototype.forEach.call(children, (child: HTMLElement) => {
    const name = child.dataset.component;

    const childComponent = registry[name ?? ""];
    if (!childComponent) return;

    child.replaceWith(childComponent(child, state));
  });

  return element;
}


export const render: Component = (root, state) => {
  const clone: Component = (root, _) => root.cloneNode(true) as HTMLElement;
  return renderWithComponent(clone)(root, state);
}
