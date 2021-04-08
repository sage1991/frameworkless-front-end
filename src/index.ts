import getTodos from "./getTodos";
import { Filter } from "./model/Filter";
import { addRegistry, render } from "./registry";
import counter from "./view/counter";
import todos from "./view/todos";
import filters from "./view/filters";
import app from "./view/app";
import { diff } from "./rendering/diff";
import { HelloWorld } from "./components/HelloWorld";
import { GitHubAvatar } from "./components/GitHubAvatar";

addRegistry("app", app);
addRegistry("counter", counter);
addRegistry("todos", todos);
addRegistry("filters", filters);

const state = {
  todos: getTodos(),
  filter: Filter.ACTIVE
}

const events = {
  deleteItem: (index: number) => {
    state.todos.splice(index, 1);
    renderDOM();
  },
  addItem: (text: string) => {
    state.todos.push({
      text,
      completed: false
    });
    renderDOM();
  }
}

const renderDOM = () => {
  window.requestAnimationFrame(() => {
    const root = document.querySelector<HTMLElement>("#root")!;
    const newMain = render(root, state, events);
    diff(document.body, root, newMain);
  });
}
renderDOM();


window.customElements.define("hello-world", HelloWorld);
window.customElements.define("github-avatar", GitHubAvatar);


const avatars = document.querySelectorAll<GitHubAvatar>("github-avatar");
avatars.forEach((avatar) => {

  avatar.addEventListener(GitHubAvatar.events.AVATAR_LOAD_COMPLETE, <EventListener> ((event: CustomEvent<{ avatar: string }>) => {
    console.log("AVATAR_LOAD_COMPLETE", event.detail.avatar);
  }));

  avatar.addEventListener(GitHubAvatar.events.AVATAR_LOAD_ERROR, <EventListener> ((event: CustomEvent<any>) => {
    console.log("AVATAR_LOAD_ERROR", event.detail);
  }))
})
