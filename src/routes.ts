import { Router } from 'express'

import PagesController from './app/controllers/PagesController'
import { API_VERSION } from './config/constants'

const routes = Router()

routes.get(`/${API_VERSION}/pages`, PagesController.index)
routes.get(`/${API_VERSION}/pages/:pageUrl`, PagesController.findOrCreate)
routes.post(`/${API_VERSION}/pages`, PagesController.create)

export default routes
