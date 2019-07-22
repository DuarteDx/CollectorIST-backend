import GetCollectionsController from './controllers/GetCollectionsController'
import InsertCollectionController from './controllers/InsertCollectionController'
import DeleteCollectionController from './controllers/DeleteCollectionController'

export const plugin = {
  name: 'object-collection-plugin',
  version: '1.0.0',
  route: '/api/v1/assets',
  register: function (server, options) {
    server.route({
      path: '/object-collection/collections',
      method: 'GET',
      ...GetCollectionsController
    })

    server.route({
      path: '/object-collection/collections/{token}',
      method: 'POST',
      ...InsertCollectionController
    })

    server.route({
      path: '/object-collection/collections/{token}',
      method: 'DELETE',
      ...DeleteCollectionController
    })
  }
}
