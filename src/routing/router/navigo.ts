import { Router } from "./index";
import Navigo from "navigo"

export const createNavigoRouter = (): Router => {
  let notFound = () => {}
  const navigo = new Navigo("/")

  return {
    addRoute({ url, render }): Router {
      // @ts-ignore
      navigo.on(url, render)
      return this
    },
    setNotFound(render: () => void): Router {
      navigo.notFound(render)
      return this
    },
    start() {
      navigo.resolve()
    },
    navigate(routeName: string) {
      navigo.navigate(routeName)
    }
  }
}
