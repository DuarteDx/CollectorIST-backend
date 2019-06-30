import ListCategoriesController from './controllers/ListCategoriesController'
import RegisterCategoriesController from './controllers/RegisterCategoriesController'
import GetCategoryController from './controllers/GetCategoryController'

export const plugin = {
  name: 'categories-plugin',
  version: '1.0.0',
  route: '/api/v1/category',
  register: function (server, options) {
    server.route({
      path: '/',
      method: 'GET',
      ...ListCategoriesController
    })

    server.route({
      path: '/{token}',
      method: 'POST',
      ...RegisterCategoriesController
    })

    server.route({
      path: '/{id}',
      method: 'GET',
      ...GetCategoryController
    })
  }
}
