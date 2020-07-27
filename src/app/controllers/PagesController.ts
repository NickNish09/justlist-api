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
      const page = await Page.findOne({ url: req.params.pageUrl }) // find the page content based on url
      if (page !== null) {
        console.log('page found')
        return res.status(200).send({ page })
      } // if page was found return the page

      console.log('new page')
      // otherwise create the page and return it
      const newPage = await Page.create({ url: req.params.pageUrl })

      return res.status(200).send({ page: newPage })
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
