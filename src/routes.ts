import { Router } from 'express'

import PagesController from './app/controllers/PagesController'

const routes = Router()

routes.get('/pages', PagesController.index)

export default routes
