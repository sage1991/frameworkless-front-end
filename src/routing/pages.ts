
interface DetailPageParam {
  id: string;
}

interface AnotherDetailPageParam {
  id: string;
  anotherId: string;
}


export const createPages = (element: HTMLElement) => {
  const home = () => {
    element.textContent = "this is home page"
  }

  const list = () => {
    element.textContent = "this i list page"
  }

  const detail = ({ id }: DetailPageParam) => {
    element.textContent = `this is detail page with id ${id}`
  }

  const anotherDetail = ({ id, anotherId }: AnotherDetailPageParam) => {
    element.textContent = `this is detail page with id ${id} and another id ${anotherId}`
  }

  const notFound = () => {
    element.textContent = "page not found"
  }

  return { home, list, detail, anotherDetail, notFound }
}
