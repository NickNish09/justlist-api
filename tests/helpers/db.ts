import mongoose from 'mongoose'
import Todo from '../../src/app/models/Todo'
import Page from '../../src/app/models/Page'
// reset the db for testing
export const eraseDb = ():void => beforeAll(async (done) => {
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

// close db connection
export const closeDbConnection = ():void => afterAll(async (done) => {
  await mongoose.connection.close()
  done()
})
