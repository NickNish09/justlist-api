import { Schema, model, Model, Document } from 'mongoose'

export interface PageInterface extends Document{
  url?: string
  pages?: Array<Schema.Types.ObjectId>
  todos?: Array<Schema.Types.ObjectId>
  uppercaseContent(): string
  createParents(): Promise<PageInterface>
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

PageSchema.methods.createParents = async function (): Promise<string> {
  const parentUrl = '/' + this.url.split('/').filter((el: string) => el !== '').slice(0, -1).join('/')
  if (parentUrl !== '/') { // if has a parent root is parent
    const parentPage = await (this.constructor as PageModelInterface).findOrCreateByUrl(parentUrl) // finds or create the parent
    if (!parentPage!.pages!.includes(this._id)) {
      parentPage!.pages!.push(this._id) // pushes son into parents pages array
      await parentPage.save()
    }
    await parentPage.createParents() // create the parents to the parent page
  }

  return ''
}
// static methods
PageSchema.statics.findOrCreateByUrl = async function (pageUrl: string): Promise<PageInterface> {
  const page = await this.findOne({ url: pageUrl }).populate([{ path: 'todos' }])
  // find the page content based on url
  if (page !== null) {
    console.log('page found')
    return page
  } // if page was found return the page

  console.log('new page')
  // otherwise create the page and return it
  const newPage = await this.create({ url: pageUrl })
  await newPage.createParents()
  return newPage.populate([{ path: 'todos', select: 'isFinished position content _id' }])
}

export default model<PageInterface, PageModelInterface>('Page', PageSchema)
