import { Schema, model, Document } from 'mongoose'
import Page from './Page'

export interface TodoInterface extends Document{
  content: string
  isFinished?: boolean
  page: Schema.Types.ObjectId
  position?: number
}

const TodoSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  page: {
    type: Schema.Types.ObjectId,
    ref: 'Page',
    required: true
  },
  position: {
    type: Number,
    required: true
  }
}, { timestamps: true })

TodoSchema.pre<TodoInterface>('validate', async function (next) {
  const page = await Page.findById(this.page)
  if (page) {
    this.position = page!.todos!.length // get the size of todos to be the position of the new todo
  } else {
    this.position = 0
  }

  next()
})

TodoSchema.post('save', async function (doc: TodoInterface, next) {
  const page = await Page.findById(doc.page)
  page!.todos!.push(doc._id)
  await page!.save()

  next()
})

export default model<TodoInterface>('Todo', TodoSchema)
