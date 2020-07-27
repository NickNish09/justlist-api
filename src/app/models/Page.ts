import { Schema, model, Model, Document } from 'mongoose'

interface PageInterface extends Document{
  url?: string
  pages?: Array<Schema.Types.ObjectId>
  todos?: Array<Schema.Types.ObjectId>
  uppercaseContent(): string
}

interface PageModelInterface extends Model<PageInterface> {
  findOrCreateByUrl(url: string): Promise<PageInterface>;
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

// static methods
PageSchema.statics.findOrCreateByUrl = async function (pageUrl: string): Promise<PageInterface> {
  const page = await this.findOne({ url: pageUrl }) // find the page content based on url
  if (page !== null) {
    console.log('page found')
    return page
  } // if page was found return the page

  console.log('new page')
  // otherwise create the page and return it
  const newPage = await this.create({ url: pageUrl })
  return newPage
}

export default model<PageInterface, PageModelInterface>('Page', PageSchema)
