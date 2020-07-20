import { Schema, model } from 'mongoose'

const PageSchema = new Schema({
  url: {
    type: String,
    required: true,
    unique: true
  },
  pages: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Page'
    }
  ],
  todos: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ],
  content: {
    type: String
  }
}, { timestamps: true })

export default model('Page', PageSchema)
