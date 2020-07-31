import { Request, Response } from 'express'

import Page from '../models/Page'

class PagesController {
  public async index (req: Request, res: Response): Promise<Response> {
    try {
      const pages = await Page.find()
      return res.status(200).send({ pages: pages })
    } catch (err) {
      console.log(err)
      return res.status(400).send({ error: 'Error at listing pages' })
    }
  }

  public async findOrCreate (req: Request, res: Response): Promise<Response> {
    try {
      console.log(req.body.pageUrl)
      const page = await Page.findOrCreateByUrl(req.body.pageUrl)
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
}

export default new PagesController()
