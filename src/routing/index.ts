import { createPages } from "./pages"
import { createRouter } from "./router"

const container = document.querySelector("main")!;

const { home, list, detail, anotherDetail, notFound } = createPages(container);
const router = createRouter();

router
  .addRoute({ fragment: "#/", render: home })
  .addRoute({ fragment: "#/list", render: list })
  .addRoute({ fragment: "#/list/:id", render: detail })
  .addRoute({ fragment: "#/list/:id/:anotherId", render: anotherDetail })
  .setNotFound(notFound)
  .start()


const navButtons = document.querySelectorAll<HTMLButtonElement>("button[data-navigate]")
navButtons.forEach((button) => {
  button.addEventListener("click", (e: MouseEvent) => {
    const { target } = e
    if ((<HTMLElement> target).matches("button[data-navigate]")) {
      const { navigate } = (<HTMLElement> target).dataset
      router.navigate(navigate ?? "/")
    }
  })
})
