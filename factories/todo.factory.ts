import factory from 'factory-girl'
import Todo, { TodoInterface } from '../src/app/models/Todo'
import { createPage } from './page.factory'

factory.define('todo', Todo, {
  content: 'comprar pao'
})

export const createTodo = async (): Promise<TodoInterface> => {
  const todo = await factory.build<TodoInterface>('todo')
  todo.page = (await createPage('novaurl'))._id
  await todo.save()
  return todo
}
