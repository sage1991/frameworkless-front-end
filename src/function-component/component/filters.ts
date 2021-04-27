import { Filter } from "../model/Filter";
import { Component } from "../registry";


interface FiltersViewState {
  filter: Filter;
}

export const Filters: Component<FiltersViewState> =  (target, { filter }) => {
  const newFiltersView = <HTMLElement> target.cloneNode(true);

  newFiltersView
    .querySelectorAll("li a")
    .forEach(htmlAnchor => {
      if (htmlAnchor.textContent === filter) {
        htmlAnchor.classList.add("selected");
      } else {
        htmlAnchor.classList.remove("selected");
      }
    });

  return newFiltersView;
}
