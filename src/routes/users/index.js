import LoginController from './controllers/LoginController'
import CreateUserController from './controllers/CreateUserController'

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
  }
}
