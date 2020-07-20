import { Request, Response } from 'express'

import Page from '../models/Page'

class PagesController {
  public async index (req: Request, res: Response): Promise<Response> {
    const pages = await Page.find()
    return res.json(pages)
  }
}

export default new PagesController()
