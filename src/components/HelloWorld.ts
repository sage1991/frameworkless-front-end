import { diff } from "../rendering/diff";


const createDomElement = (color: string) => {
  const div = document.createElement("div");
  div.textContent = "Hello World!";
  div.style.color = color;
  return div;
}

export class HelloWorld extends HTMLElement {
  private div: HTMLDivElement;

  static get observedAttributes() {
    return [ "color" ];
  }

  get color() {
    return this.getAttribute("color") || "black";
  }

  set color(color: string) {
    this.setAttribute("color", color);
  }

  // component did mount
  connectedCallback() {
    requestAnimationFrame(() => {
      this.div = document.createElement("div");
      this.div.textContent = "Hello World!";
      this.div.style.color = this.color;
      this.appendChild(this.div);
    });
  }

  // component will unmount
  disconnectedCallback() {

  }

  attributeChangedCallback(name: string, prev: string, next: string) {
    if (!this.hasChildNodes()) return;
    diff(this, this.firstElementChild, createDomElement(next));
  }
}
