import { Router } from 'express'

import PagesController from './app/controllers/PagesController'
import TodosController from './app/controllers/TodosController'
import { API_VERSION } from './config/constants'

const routes = Router()

routes.get(`/${API_VERSION}/pages`, PagesController.index)
routes.post(`/${API_VERSION}/pages/findOrCreate`, PagesController.findOrCreate)
routes.post(`/${API_VERSION}/pages`, PagesController.create)
routes.post(`/${API_VERSION}/pages/:pageId/updateTodosOrders`, PagesController.updateTodosOrders)

// todos
routes.post(`/${API_VERSION}/todos`, TodosController.create)
routes.put(`/${API_VERSION}/todos/:todoId`, TodosController.update)
routes.delete(`/${API_VERSION}/todos/:todoId`, TodosController.delete)

export default routes
