import EditObjectDescriptionController from './controllers/EditObjectDescriptionController'
import SearchObjectDescriptionController from './controllers/SearchObjectDescriptionController'
import ConfigureObjectDescriptionController from './controllers/ConfigureObjectDescriptionController'
import GetObjectDescriptionController from './controllers/GetObjectDescriptionController'
import GetUserCategoriesController from './controllers/GetUserCategoriesController'

export const plugin = {
  name: 'object-description-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/object-description',
      method: 'GET',
      ...GetObjectDescriptionController
    })

    server.route({
      path: '/object-description/categories/{token}',
      method: 'GET',
      ...GetUserCategoriesController
    })

    server.route({
      path: '/search/object-description/{token}',
      method: 'GET',
      ...SearchObjectDescriptionController
    })

    server.route({
      path: '/{id}/object-description/edit/{token}',
      method: 'PUT',
      ...EditObjectDescriptionController
    })

    server.route({
      path: '/config/object-description/{token}',
      method: 'PUT',
      ...ConfigureObjectDescriptionController
    })
  }
}
