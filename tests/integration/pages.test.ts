import request, { Response } from 'supertest'
import app from '../../src/app'
import mongoose from 'mongoose'
import Page, { PageInterface } from '../../src/app/models/Page'
import Todo from '../../src/app/models/Todo'

// reset the db for testing
beforeAll(async (done) => {
  await Page.remove({}, function (err) {
    console.log('collection removed')
    console.log(err)
  })
  done()
})

// close db connection
afterAll(async (done) => {
  await mongoose.connection.close()
  done()
})

describe('GET #index', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/v1/pages')
    expect(response.status).toBe(200)
  })
})

describe('POST #findOrCreate', () => {
  test('It should create a new page if none', async () => {
    const response = await request(app).post('/v1/pages/findOrCreate').send({ pageUrl: 'newpage' })
    expect(response.body.page.url).toEqual('newpage') // expect response with the new page created
  })

  test('It should find a existing page and return it', async () => {
    const response = await request(app).post('/v1/pages/findOrCreate').send({ pageUrl: 'newpage' }) // created in above test
    expect(response.body.page.url).toEqual('newpage') // expect response with the page found
  })
})

describe('POST #updateTodosOrders', () => {
  // expected an array with the ids and indexes of the todos in the page
  let response: Response
  let page: PageInterface
  let todosIds: Array<string>
  beforeAll(async () => {
    page = await Page.create({ url: '/listadecompras' })
    todosIds = []
    const todos = ['comprar pao', 'comprar leite']
    for (const todo of todos) {
      todosIds.push((await Todo.create({ page: page._id, content: todo }))._id)
    }
    const inversedTodoOrder = [{ position: 0, todoId: todosIds[1] }, { position: 1, todoId: todosIds[0] }]
    response = await request(app).post(`/v1/pages/${page._id}/updateTodosOrders`).send({ todosOrder: inversedTodoOrder })
  })
  it('should return the inverted order of todos in the page', async () => {
    console.log(response.body.page.todos)
    expect(response.body.page.todos[0].content).toEqual('comprar leite') // first id should now be the second one previous
    expect(response.body.page.todos[1].content).toEqual('comprar pao')
  })
})
