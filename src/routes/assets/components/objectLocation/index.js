import EditObjectLocationController from './controllers/EditObjectLocationController'
import SearchObjectLocationController from './controllers/SearchObjectLocationController'
import ConfigureObjectLocationController from './controllers/ConfigureObjectLocationController'

export const plugin = {
  name: 'object-location-plugin',
  version: '1.0.0',
  route: '/api/v1/objectLocation',
  register: function (server, options) {
    server.route({
      path: '/{token}',
      method: 'GET',
      ...SearchObjectLocationController
    })

    server.route({
      path: '/{token}',
      method: 'PUT',
      ...EditObjectLocationController
    })

    server.route({
      path: '/{token}',
      method: 'PUT',
      ...ConfigureObjectLocationController
    })
  }
}
