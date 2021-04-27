

export type EventMap = {
  [key: string]: (...args: any) => void;
}

export type Component<T> = (target: HTMLElement, state: T, events: EventMap) => HTMLElement;

interface Registry {
  [key: string]: Component<any>;
}

type EnhanceComponent = (Component: Component<unknown>) => Component<unknown>;

const enhanceComponent: EnhanceComponent = (Component) => (target, state, events) => {
  const element = Component(target, state, events);
  const children = element.querySelectorAll("[data-component]");

  children.forEach(child => {
    const { component } = (<HTMLElement> child).dataset;
    const ChildComponent = registry[component!];
    if (!ChildComponent) return;
    child.replaceWith(ChildComponent(<HTMLElement> child, state, events));
  });

  return element;
}

const registry: Registry = {};

export const addRegistry = (name: string, Component: Component<any>) => {
  registry[name] = enhanceComponent(Component);
}

export const render = (root: HTMLElement, state: unknown, events: EventMap) => {
  const RootComponent: Component<unknown> = (root) => {
    return <HTMLElement> root.cloneNode(true);
  }
  return enhanceComponent(RootComponent)(root, state, events);
}
