import ListCollectionsController from './controllers/ListCollectionsController'

export const plugin = {
  name: 'assets-plugin',
  version: '1.0.0',
  route: '/api/v1/collection',
  register: function (server, options) {
    server.route({
      path: '/all',
      method: 'GET',
      ...ListCollectionsController
    })
  }
}
