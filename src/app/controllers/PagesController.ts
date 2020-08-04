import { Request, Response } from 'express'

import Page from '../models/Page'
import Todo from '../models/Todo'

class PagesController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const pages = await Page.find().populate([{ path: 'pages', select: 'url' }])
      return res.status(200).send({ pages: pages })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at listing pages' })
    }
  }

  public async findOrCreate (req: Request, res: Response): Promise<Response> {
    try {
      let url = req.body.pageUrl
      if (url[url.length - 1] === '/') {
        url = url.slice(0, -1)
      }
      console.log(url)
      const page = await Page.findOrCreateByUrl(url)
      // find or create the page based on url
      return res.status(200).send({ page: page })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at listing page' })
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const page = await Page.create(req.body)

      return res.status(200).send({ page })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating page' })
    }
  }

  public async updateTodosOrders (req: Request, res: Response): Promise<Response> {
    try {
      const { todosOrder } = req.body

      // indexAndTodoId |-> [position, _id]
      for (const indexAndTodoId of todosOrder) {
        await Todo.findByIdAndUpdate(indexAndTodoId.todoId, { position: indexAndTodoId.position })
      }
      const page = await Page.findById(req.params.pageId).populate([{ path: 'todos' }])
      return res.status(200).send({ page })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating page' })
    }
  }
}

export default new PagesController()
