import EditObjectHistoryController from './controllers/EditObjectHistoryController'
import SearchObjectHistoryController from './controllers/SearchObjectHistoryController'
import ConfigureObjectHistoryController from './controllers/ConfigureObjectHistoryController'

export const plugin = {
  name: 'object-history-plugin',
  version: '1.0.0',
  route: '/api/v1/objectHistory',
  register: function (server, options) {
    server.route({
      path: '/{token}',
      method: 'GET',
      ...SearchObjectHistoryController
    })

    server.route({
      path: '/{token}',
      method: 'PUT',
      ...EditObjectHistoryController
    })

    server.route({
      path: '/{token}',
      method: 'PUT',
      ...ConfigureObjectHistoryController
    })
  }
}
