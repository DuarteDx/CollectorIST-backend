import EditObjectHistoryController from './controllers/EditObjectHistoryController'
import SearchObjectHistoryController from './controllers/SearchObjectHistoryController'
import ConfigureObjectHistoryController from './controllers/ConfigureObjectHistoryController'

export const plugin = {
  name: 'object-history-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/search/object-history/{token}',
      method: 'GET',
      ...SearchObjectHistoryController
    })

    server.route({
      path: '/{id}/object-history/edit/{token}',
      method: 'PUT',
      ...EditObjectHistoryController
    })

    server.route({
      path: '/config/object-history/{token}',
      method: 'PUT',
      ...ConfigureObjectHistoryController
    })
  }
}
