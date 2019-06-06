import ListAssetsController from './controllers/ListAssetsController'
import RegisterAssetController from './controllers/RegisterAssetController'
import ViewAssetController from './controllers/ViewAssetController'
import DeleteAssetController from './controllers/DeleteAssetController'
import TestAuthController from './controllers/TestAuthController'

export const plugin = {
  name: 'assets-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/',
      method: 'POST',
      ...RegisterAssetController
    })

    server.route({
      path: '/',
      method: 'GET',
      ...ListAssetsController
    })

    server.route({
      path: '/{id}/{token}',
      method: 'GET',
      ...ViewAssetController
    })

    server.route({
      path: '/',
      method: 'DELETE',
      ...DeleteAssetController
    })

    server.route({
      path: '/testAuth',
      method: 'POST',
      ...TestAuthController
    })
  }
}
