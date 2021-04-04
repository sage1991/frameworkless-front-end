
type Component = (target: HTMLElement, state: any, events?: any) => HTMLElement;

interface Registry {
  [key: string]: Component | undefined;
}

const registry: Registry = {};

export const addRegistry = (name: string, component: Component) => {
  registry[name] = withRender(component);
}


type RenderWithComponent = (component: Component) => Component;

const withRender: RenderWithComponent = (component) => (target, state, events) => {
  const element = component(target, state, events);
  const children = element.querySelectorAll("[data-component]");

  Array.prototype.forEach.call(children, (child: HTMLElement) => {
    const name = child.dataset.component;

    const childComponent = registry[name ?? ""];
    if (!childComponent) return;

    child.replaceWith(childComponent(child, state, events));
  });

  return element;
}


export const render: Component = (root, state, events) => {
  const clone: Component = (root, _) => <HTMLElement> root.cloneNode(true);
  return withRender(clone)(root, state, events);
}
