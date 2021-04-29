import { extractPathParams, extractUrlMeta, Route, Router } from "./index";

export const createHashRouter = () => {
  const routes: Route<any>[] = []

  let notFound = () => {}

  const checkRoutes = () => {
    const { hash } = location;
    const route = routes.find(({ regex }) => regex.test(hash))
    if (!route) {
      notFound()
      return
    }

    const param = extractPathParams(route, hash)
    route.render(param)
  }

  const router: Router = {
    addRoute({ render, url }) {
      const { params, regex } = extractUrlMeta(url)
      routes.push({
        render,
        url: url,
        regex: new RegExp(`^#${regex}$`),
        params
      })

      return this
    },
    setNotFound(render) {
      notFound = render
      return this
    },
    start() {
      window.addEventListener("hashchange", checkRoutes)
      if (!location.hash) {
        location.hash = "#/"
      }
      checkRoutes()

      document.addEventListener("click", (e) => {
        const target = <HTMLElement> e.target
        if (target.matches("[data-navigate]")) {
          e.preventDefault()
          router.navigate(target.dataset.navigate!)
        }
      })
    },
    navigate(fragment: string) {
      location.hash = `#${fragment}`
    }
  }

  return router
}
