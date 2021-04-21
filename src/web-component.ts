import { HelloWorld, GitHubAvatar, TodoApp, TodoList, TodoFooter } from "./components";


customElements.define("hello-world", HelloWorld);
customElements.define("github-avatar", GitHubAvatar);
customElements.define("todo-app", TodoApp);
customElements.define("todo-list", TodoList);
customElements.define("todo-footer", TodoFooter);


document
  .querySelectorAll<GitHubAvatar>("github-avatar")
  .forEach((avatar) => {
    avatar.addEventListener(GitHubAvatar.events.AVATAR_LOAD_COMPLETE, <EventListener>((event: CustomEvent<{ avatar: string }>) => {
      console.log("AVATAR_LOAD_COMPLETE", event.detail.avatar);
    }));
    avatar.addEventListener(GitHubAvatar.events.AVATAR_LOAD_ERROR, <EventListener>((event: CustomEvent<any>) => {
      console.log("AVATAR_LOAD_ERROR", event.detail);
    }))
  })
