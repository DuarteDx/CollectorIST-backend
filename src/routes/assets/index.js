import ListAssetsController from './controllers/ListAssetsController'
import RegisterAssetController from './controllers/RegisterAssetController'
import ViewAssetController from './controllers/ViewAssetController'

export const plugin = {
  name: 'assets-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/',
      method: 'GET',
      ...ListAssetsController
    })

    server.route({
      path: '/',
      method: 'POST',
      ...RegisterAssetController
    })

    server.route({
      path: '/{id}',
      method: 'GET',
      ...ViewAssetController
    })
  }
}
