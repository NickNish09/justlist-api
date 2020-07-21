import request from 'supertest'
import app from '../../src/app'
import mongoose from 'mongoose'

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/v1/pages')
    expect(response.status).toBe(200)
    expect(1 + 1).toEqual(2)
    await mongoose.connection.close()
  })
})
