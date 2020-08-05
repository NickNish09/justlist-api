import { Request, Response } from 'express'

import Todo from '../models/Todo'
import { io } from '../../server'
import { TODO_CREATE_TYPE, TODO_DELETE_TYPE, TODO_UPDATE_TYPE } from '../../config/constants'

class TodosController {
  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const todo = await Todo.create(req.body)

      if (todo) {
        io.emit(`${TODO_CREATE_TYPE}${todo.page}`, { todo })
      }
      return res.status(200).send({ todo })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating todo' })
    }
  }

  public async update (req: Request, res: Response): Promise<Response> {
    try {
      const todo = await Todo.findOneAndUpdate({ _id: req.params.todoId }, req.body, { new: true })

      if (todo) {
        io.emit(`${TODO_UPDATE_TYPE}${todo.page}`, { todo })
      }
      return res.status(200).send({ todo })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating todo' })
    }
  }

  public async delete (req: Request, res: Response): Promise<Response> {
    try {
      const todo = await Todo.findById(req.params.todoId)
      await Todo.findByIdAndRemove(req.params.todoId)

      io.emit(`${TODO_DELETE_TYPE}${todo!.page}`, { todo })
      return res.status(200).send({ msg: 'Todo Deleted.' })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating todo' })
    }
  }
}

export default new TodosController()
