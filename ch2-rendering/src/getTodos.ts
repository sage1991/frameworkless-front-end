import faker from "faker";
import { Todo } from "./model/Todo";


type TodoFactory = () => Todo;

const factory: TodoFactory = (): Todo => ({
  text: faker.random.words(2),
  completed: faker.random.boolean()
})


const repeat = (factory: TodoFactory, count: number): Todo[] => {
  const array: Todo[] = [];
  for (let index = 0; index < count; index++) {
    array.push(factory());
  }
  return array;
}


export default () => {
  const howMany = faker.random.number(10);
  return repeat(factory, howMany);
}
