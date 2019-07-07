import EditObjectDescriptionController from './controllers/EditObjectDescriptionController'
import SearchObjectDescriptionController from './controllers/SearchObjectDescriptionController'
import ConfigureObjectDescriptionController from './controllers/ConfigureObjectDescriptionController'

export const plugin = {
  name: 'object-description-plugin',
  version: '1.0.0',
  route: '/api/v1/objectDescription',
  register: function (server, options) {
    server.route({
      path: '/{token}',
      method: 'GET',
      ...SearchObjectDescriptionController
    })

    server.route({
      path: '/{token}',
      method: 'PUT',
      ...EditObjectDescriptionController
    })

    server.route({
      path: '/{token}',
      method: 'PUT',
      ...ConfigureObjectDescriptionController
    })
  }
}
