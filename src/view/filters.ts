import { Filter } from "../model/Filter";


interface FiltersViewState {
  filter: Filter;
}

export default (target: HTMLElement, { filter }: FiltersViewState) => {
  const newFiltersView = target.cloneNode(true) as HTMLElement;

  Array
    .from(newFiltersView.querySelectorAll("li a"))
    .forEach(htmlAnchor => {
      if (htmlAnchor.textContent === filter) {
        htmlAnchor.classList.add("selected");
      } else {
        htmlAnchor.classList.remove("selected");
      }
    });

  return newFiltersView;
}
