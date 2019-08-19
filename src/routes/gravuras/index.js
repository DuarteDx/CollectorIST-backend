import EditGravurasController from './controllers/EditGravurasController'

export const plugin = {
  name: 'gravuras-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/{id}/gravuras/edit/{token}',
      method: 'PUT',
      ...EditGravurasController
    })
  }
}
