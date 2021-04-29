
export * from "./hash"
export * from "./history"
export * from "./navigo"

export interface Route<T> {
  regex: RegExp;
  params: string[];
  url: string;
  render: (param: T) => void;
}

export interface Router {
  addRoute<T>(route: Omit<Route<T>, "regex" | "params">): Router;
  setNotFound(render: () => void): Router;
  start(): void;
  navigate(routeName: string): void;
}

export interface UrlMataData {
  params: string[];
  regex: string;
}


export const extractPathParams = <T> (route: Route<T>, url: string) => {
  const params: { [key: string]: string } = {}
  const matches = url.match(route.regex)!

  if (!matches) return params

  matches.shift()
  route.params.forEach((name, index) => {
    params[name] = matches[index]
  })

  return params
}

const PATH_PARAM_REGEX = /:(\w+)/g
const URL_CHARACTER_REGEX_STRING = "([^\\\\/]+)"

export const extractUrlMeta = (url: string): UrlMataData => {
  const params: string[] = []

  const regex = url
    .replace(PATH_PARAM_REGEX, (match, name) => {
      params.push(name)
      return URL_CHARACTER_REGEX_STRING
    })

  return { params, regex }
}
