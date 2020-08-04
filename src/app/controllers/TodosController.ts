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

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const todo = await Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })

      return res.status(200).send({ todo })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating todo' })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      await Todo.findByIdAndRemove(req.params.todoId)

      return res.status(200).send({ msg: 'Todo Deleted.' })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating todo' })
    }
  }
}

export default new TodosController()
