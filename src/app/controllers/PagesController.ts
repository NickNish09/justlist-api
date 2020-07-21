import { Request, Response } from 'express'

import Page from '../models/Page'

class PagesController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const pages = await Page.find()
      return res.status(200).send({ yan: pages })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at listing page' })
    }
  }

  public async create (req: Request, res: Response): Promise<Response> {
    try {
      const page = await Page.create(req.body)

      console.log(page.uppercaseContent())
      return res.status(200).send({ page })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at creating page' })
    }
  }
}

export default new PagesController()
