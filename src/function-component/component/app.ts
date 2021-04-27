import { Component, EventMap } from "../registry";


let template: HTMLTemplateElement;

const createNode = () => {
  if (!template) {
    template = document.querySelector<HTMLTemplateElement>("#todo-app")!
  }
  return <HTMLElement> template.content.firstElementChild!.cloneNode(true);
}

const addEvent = (target: HTMLElement, event: any) => {
  target
      .querySelector<HTMLInputElement>(".new-todo")!
      .addEventListener("keypress", (e) => {
        if (e.key !== "Enter") return;
        const { value } = <HTMLInputElement> e.target;
        event.addItem(value);
        (<HTMLInputElement> e.target).value = "";
      })
}

export const App: Component<undefined> = (app: HTMLElement, state: unknown, events: EventMap) => {
  const newApp = <HTMLElement> app.cloneNode(true);
  newApp.innerHTML = "";
  newApp.appendChild(createNode());
  addEvent(newApp, events);
  return newApp;
}
