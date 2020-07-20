import { Schema, model } from 'mongoose'

const TodoSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  isFinished: {
    type: Boolean
  },
  position: {
    type: Number,
    required: true
  }
}, { timestamps: true })

export default model('Todo', TodoSchema)
