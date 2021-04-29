import { extractPathParams, extractUrlMeta, Route, Router } from "./index"

export const createHistoryRouter = (): Router => {
  const routes: Route<any>[] = []
  let notFound = () => {}

  const channel = new MessageChannel()

  const checkRoute = () => {
    const { pathname } = location
    const route = routes.find(({ regex }) => regex.test(pathname))
    if (!route) {
      notFound()
      return
    }

    const param = extractPathParams(route, pathname)
    route.render(param)
  }

  return {
    addRoute({ url, render }): Router {
      const { regex, params } = extractUrlMeta(url)
      routes.push({
        url,
        render,
        params,
        regex: new RegExp(`^${regex}$`)
      })
      return this
    },
    setNotFound(render: () => void): Router {
      notFound = render
      return this
    },
    start() {
      checkRoute()

      window.addEventListener("popstate", checkRoute)

      channel.port2.addEventListener("message", checkRoute)
      channel.port2.start()

      document.addEventListener("click", (e) => {
        const target = <HTMLElement> e.target
        if (target.matches("a[data-nav]")) {
          e.preventDefault()
          this.navigate((<HTMLAnchorElement> target).href)
        }
      })
    },
    navigate(routeName: string) {
      history.pushState(null, "", routeName)
      channel.port1.postMessage(routeName)
    }
  }
}
