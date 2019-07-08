import EditObjectDescriptionController from './controllers/EditObjectDescriptionController'
import SearchObjectDescriptionController from './controllers/SearchObjectDescriptionController'
import ConfigureObjectDescriptionController from './controllers/ConfigureObjectDescriptionController'

export const plugin = {
  name: 'object-description-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
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
