import { Schema, model, Document } from 'mongoose'

interface PageInterface extends Document{
  url?: string
  pages?: Array<Schema.Types.ObjectId>
  todos?: Array<Schema.Types.ObjectId>
  uppercaseContent(): string
}

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

PageSchema.methods.uppercaseContent = function (): string {
  return this.url.toUpperCase()
}

export default model<PageInterface>('Page', PageSchema)
