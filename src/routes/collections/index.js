import ListCollectionsController from './controllers/ListCollectionsController'
import RegisterCollectionController from './controllers/RegisterCollectionController'
import DeleteCollectionController from './controllers/DeleteCollectionController'
import GetCollectionController from './controllers/GetCollectionController'

export const plugin = {
  name: 'collections-plugin',
  version: '1.0.0',
  route: '/api/v1/collection',
  register: function (server, options) {
    server.route({
      path: '/',
      method: 'GET',
      ...ListCollectionsController
    })

    server.route({
      path: '/{token}',
      method: 'POST',
      ...RegisterCollectionController
    })

    server.route({
      path: '/{id}/{token}',
      method: 'DELETE',
      ...DeleteCollectionController
    })

    server.route({
      path: '/{id}',
      method: 'GET',
      ...GetCollectionController
    })
  }
}
