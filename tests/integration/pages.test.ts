import request from 'supertest'
import app from '../../src/app'
import mongoose from 'mongoose'

// close db connection
afterAll(async (done) => {
  await mongoose.connection.close()
  done()
})

describe('Test the pages index path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/v1/pages')
    expect(response.status).toBe(200)
  })
})

describe('GET #findOrCreate', () => {
  test('It should create a new page if none', async () => {
    const response = await request(app).get('/v1/pages/newpage')
    expect(response.status).toBe(200)
    expect(response.body.page.url).toEqual('newpage') // expect response with the new page created
  })
})
