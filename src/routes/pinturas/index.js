import EditPinturasController from './controllers/EditPinturasController'

export const plugin = {
  name: 'pinturas-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/{id}/pinturas/edit/{token}',
      method: 'PUT',
      ...EditPinturasController
    })
  }
}
