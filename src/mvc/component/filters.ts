import { Component } from "../registry";
import { Filter } from "../model/Filter";


export const Filters: Component =  (target, state, events) => {
  const { filter } = state
  const { changeFilter } = events
  const newFiltersView = <HTMLElement> target.cloneNode(true)

  newFiltersView
    .querySelectorAll<HTMLAnchorElement>("li a")
    .forEach(a => {
      if (a.textContent === filter) {
        a.classList.add("selected")
      } else {
        a.classList.remove("selected")
      }

      a.addEventListener("click", e => {
        e.preventDefault()
        changeFilter(<Filter> a.textContent)
      })
    })

  return newFiltersView
}
