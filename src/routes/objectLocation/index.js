import EditObjectLocationController from './controllers/EditObjectLocationController'
import SearchObjectLocationController from './controllers/SearchObjectLocationController'
import ConfigureObjectLocationController from './controllers/ConfigureObjectLocationController'

export const plugin = {
  name: 'object-location-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/search/object-location/{token}',
      method: 'GET',
      ...SearchObjectLocationController
    })

    server.route({
      path: '/{id}/object-location/edit/{token}',
      method: 'PUT',
      ...EditObjectLocationController
    })

    server.route({
      path: '/config/object-location/{token}',
      method: 'PUT',
      ...ConfigureObjectLocationController
    })
  }
}
