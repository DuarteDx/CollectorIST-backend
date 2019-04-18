import HandleOAIPMHRequestController from './controllers/HandleOAIPMHRequestController'

export const plugin = {
  name: 'oai-pmh-plugin',
  version: '1.0.0',
  route: '/api/v1/oai-pmh',
  register: function (server, options) {
    server.route({
      path: '/',
      method: 'GET',
      ...HandleOAIPMHRequestController
    })
  }
}
