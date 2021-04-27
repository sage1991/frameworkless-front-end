
interface Route<T> {
  regex: RegExp;
  params: string[];
  fragment: string;
  render: (param: T) => void;
}

interface Router {
  addRoute<T>(route: Omit<Route<T>, "regex" | "params">): Router;
  setNotFound(render: () => void): Router;
  start(): void;
  navigate(routeName: string): void;
}


const PATH_PARAM_REGEX = /:(\w+)/g;

export const createRouter = () => {
  const routes: Route<any>[] = []

  let notFound = () => {}

  const parseParam = <T> (route: Route<T>, hash: string) => {
    const params: { [key: string]: string } = {}
    const matches = hash.match(route.regex)!

    if (!matches) return params

    matches.shift()
    route.params.forEach((name, index) => {
      params[name] = matches[index]
    })

    return params
  }

  const checkRoutes = () => {
    const { hash } = location;
    const current = routes.find(({ regex }) => regex.test(hash))
    if (!current) {
      notFound()
      return
    }

    const param = parseParam(current, hash)
    current.render(param)
  }

  const router: Router = {
    addRoute({ render, fragment }) {
      const params: string[] = []

      const regex = fragment
        .replace(PATH_PARAM_REGEX, (match, name) => {
          params.push(name)
          return "([^\\\\/]+)"
        })

      routes.push({
        render,
        fragment,
        regex: new RegExp(`^${regex}$`),
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
    },
    navigate(fragment: string) {
      location.hash = `#${fragment}`
    }
  }

  return router
}
