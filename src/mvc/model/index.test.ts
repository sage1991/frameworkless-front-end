import { modelFactory } from "./index"
import { Filter } from "./Filter";


describe("TodoMVC Model", () => {

  test("data should be immutable", () => {
    const model = modelFactory()
    expect(() => {
      // model.getState().filter = Filter.ACTIVE
    }).toThrow()
  })

  test("should add an item", () => {
    const model = modelFactory()
    model.addItem("dummy")

    const { todos } = model.getState()

    expect(todos.length).toBe(1)
    expect(todos[0]).toEqual({
      text: "dummy",
      completed: false
    })
  })

  test('should not add an item when a falsy text is provided', () => {
    const model = modelFactory()

    model.addItem('')
    // @ts-ignore
    model.addItem(undefined)
    // @ts-ignore
    model.addItem(0)
    // @ts-ignore
    model.addItem()
    // @ts-ignore
    model.addItem(false)

    const { todos } = model.getState()
    expect(todos.length).toBe(0)
  })

  test('should update an item', () => {
    const model = modelFactory({
      todos: [{
        text: 'dummy',
        completed: false
      }],
      filter: Filter.ACTIVE
    })

    model.updateItem(0, 'new-dummy')

    const { todos } = model.getState()

    expect(todos[0].text).toBe('new-dummy')
  })

  test('should not update an item when an invalid index is provided', () => {
    const model = modelFactory({
      todos: [{
        text: 'dummy',
        completed: false
      }],
      filter: Filter.ACTIVE
    })

    model.updateItem(1, 'new-dummy')

    const { todos } = model.getState()

    expect(todos[0].text).toBe('dummy')
  })
})
