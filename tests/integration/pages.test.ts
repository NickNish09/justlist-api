import request from 'supertest'
import app from '../../src/app'
import mongoose from 'mongoose'
import Page from '../../src/app/models/Page'

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

describe('GET #findOrCreate', () => {
  test('It should create a new page if none', async () => {
    const response = await request(app).get('/v1/pages/newpage')
    expect(response.body.page.url).toEqual('newpage') // expect response with the new page created
  })

  test('It should find a existing page and return it', async () => {
    const response = await request(app).get('/v1/pages/newpage') // created in above test
    expect(response.body.page.url).toEqual('newpage') // expect response with the page found
  })
})
