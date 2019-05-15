import ListCollectionsController from './controllers/ListCollectionsController'
import RegisterCollectionController from './controllers/RegisterCollectionController'
import DeleteCollectionController from './controllers/DeleteCollectionController'

export const plugin = {
  name: 'collections-plugin',
  version: '1.0.0',
  route: '/api/v1/collection',
  register: function (server, options) {
    server.route({
      path: '/all',
      method: 'GET',
      ...ListCollectionsController
    })

    server.route({
      path: '/',
      method: 'POST',
      ...RegisterCollectionController
    })

    server.route({
      path: '/',
      method: 'DELETE',
      ...DeleteCollectionController
    })
  }
}
