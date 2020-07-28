import request, { Response } from 'supertest'
import app from '../../src/app'
import Page, { PageInterface } from '../../src/app/models/Page'
import Todo, { TodoInterface } from '../../src/app/models/Todo'
import { createPage } from '../../factories/page.factory'
import { createTodo } from '../../factories/todo.factory'
import mongoose from 'mongoose'

beforeAll(async (done) => {
  await Todo.remove({}, function (err) {
    console.log('todos removed')
    console.log(err)
  })
  await Page.remove({}, function (err) {
    console.log('pages removed')
    console.log(err)
  })
  done()
})
afterAll(async (done) => {
  await mongoose.connection.close()
  done()
})

describe('POST #create', () => {
  let response: Response
  let page: PageInterface
  beforeAll(async () => {
    page = await createPage()
    response = await request(app).post('/v1/todos').send({ content: 'comprar pao', page: page._id })
  })

  it('should return OK', async () => {
    expect(response.status).toBe(200)
  })

  it('should create and return a todo', async () => {
    expect(response.body.todo.content).toEqual('comprar pao')
  })

  it('should return a todo with position 0', async () => {
    expect(response.body.todo.position).toEqual(0)
  })

  it('should push the todo to the page it belongs', async () => {
    const pageUpdated = await Page.findById(response.body.todo.page)
    console.log(pageUpdated)
    expect(pageUpdated!.todos!.length).toEqual(1) // has the new todo in there
  })
})

describe('POST #update', () => {
  let response: Response
  let todo: TodoInterface
  beforeAll(async () => {
    todo = await createTodo()
    response = await request(app).put(`/v1/todos/${todo._id}`).send({ content: 'todo editado', isFinished: true })
  })

  it('should return OK', async () => {
    expect(response.status).toBe(200)
  })

  it('should update the todo content', async () => {
    expect(response.body.todo.content).toEqual('todo editado')
  })

  it('should update the todo isFinished', async () => {
    expect(response.body.todo.isFinished).toBeTruthy()
  })
})
