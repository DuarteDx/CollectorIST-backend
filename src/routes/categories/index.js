import ListCategoriesController from './controllers/ListCategoriesController'
import RegisterCategoriesController from './controllers/RegisterCategoriesController'

export const plugin = {
  name: 'collections-plugin',
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
  }
}
