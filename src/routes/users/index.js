import LoginController from './controllers/LoginController'
import CreateUserController from './controllers/CreateUserController'
import ListUsersController from './controllers/ListUsersController'
import DeleteUserController from './controllers/DeleteUserController'
import GetUserController from './controllers/GetUserController'
import DeleteUserCollectionController from './controllers/DeleteUserCollectionController'

export const plugin = {
  name: 'users-plugin',
  version: '1.0.0',
  route: '/api/v1/users',
  register: function (server, options) {
    server.route({
      path: '/login',
      method: 'POST',
      ...LoginController
    })

    server.route({
      path: '/createUser',
      method: 'POST',
      ...CreateUserController
    })

    server.route({
      path: '/all/{token}',
      method: 'GET',
      ...ListUsersController
    })

    server.route({
      path: '/{istId}/{token}',
      method: 'GET',
      ...GetUserController
    })

    server.route({
      path: '/',
      method: 'DELETE',
      ...DeleteUserController
    })

    server.route({
      path: '/{istId}/collections/{collectionName}/{token}',
      method: 'DELETE',
      ...DeleteUserCollectionController
    })
  }
}
