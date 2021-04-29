import { createPages } from "./pages"
import { createHashRouter, createHistoryRouter, createNavigoRouter } from "./router"

const container = document.querySelector("main")!

const { home, list, detail, anotherDetail, notFound } = createPages(container)
const router = createHistoryRouter()

router
  .addRoute({ url: "/", render: home })
  .addRoute({ url: "/list", render: list })
  .addRoute({ url: "/list/:id", render: detail })
  .addRoute({ url: "/list/:id/:anotherId", render: anotherDetail })
  .setNotFound(notFound)
  .start()
