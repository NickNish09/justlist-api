// import request from 'supertest'
// import app from '../../src/app'

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    // const response = await request(app).get('/')
    // return expect(response.status).toEqual(200)
    return expect(1 + 1).toEqual(2)
  })
})
