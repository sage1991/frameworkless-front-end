

let template: HTMLTemplateElement;

const createNode = () => {
  if (!template) {
    template = document.querySelector<HTMLTemplateElement>("#todo-app")!
  }

  return <HTMLElement> template.content.firstElementChild!.cloneNode(true);
}

export default (app: HTMLElement) => {
  const newApp = <HTMLElement> app.cloneNode(true);

  newApp.innerHTML = "";
  newApp.appendChild(createNode());

  return newApp;
}
