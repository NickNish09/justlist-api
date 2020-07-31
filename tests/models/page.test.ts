import mongoose from 'mongoose'
import Page from '../../src/app/models/Page'
import Todo from '../../src/app/models/Todo'

// reset the db for testing
beforeAll(async (done) => {
  const mongoUri = 'mongodb://localhost:27017/justlist' // test db
  mongoose.connect(mongoUri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .then(result => {
      console.log('MongoDB Conectado')
    })
    .catch(error => {
      console.log(error)
    })
  await Page.remove({}, function (err) {
    console.log('collection removed')
    console.log(err)
  })
  await Todo.remove({}, function (err) {
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

describe('#Page.findOrCreateByUrl', () => {
  describe('with new url', () => {
    test('It should create a new page', async () => {
      await Page.findOrCreateByUrl('nicholas')
      const pageCount = await Page.count({})
      expect(pageCount).toEqual(1)
    })
  })

  describe('with an existing url', () => {
    test('It should find the page', async () => {
      await Page.findOrCreateByUrl('nicholas')
      const pageCount = await Page.count({})
      expect(pageCount).toEqual(1)
    })
  })
})
