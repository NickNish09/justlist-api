import { Request, Response } from 'express'

import Todo from '../models/Todo'

class TodosController {
  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const todo = await Todo.create(req.body)

      return res.status(200).send({ todo })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating todo' })
    }
  }
}

export default new TodosController()
