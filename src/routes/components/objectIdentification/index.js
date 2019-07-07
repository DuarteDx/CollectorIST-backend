import EditObjectIdentificationController from './controllers/EditObjectIdentificationController'
import SearchObjectIdentificationController from './controllers/SearchObjectIdentificationController'
import ConfigureObjectIdentificationController from './controllers/ConfigureObjectIdentificationController'

export const plugin = {
  name: 'object-identification-plugin',
  version: '1.0.0',
  route: '/api/v1/objectIdentification',
  register: function (server, options) {
    server.route({
      path: '/{token}',
      method: 'GET',
      ...SearchObjectIdentificationController
    })

    server.route({
      path: '/{token}/{assetId}',
      method: 'PUT',
      ...EditObjectIdentificationController
    })

    server.route({
      path: '/{token}/{assetId}',
      method: 'PUT',
      ...ConfigureObjectIdentificationController
    })
  }
}
