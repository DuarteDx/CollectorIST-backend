import ListLogsComponent from './controllers/ListLogsComponent'

export const plugin = {
  name: 'logs-plugin',
  version: '1.0.0',
  route: '/api/v1/logs',
  register: function (server, options) {
    server.route({
      path: '/',
      method: 'GET',
      ...ListLogsComponent
    })
  }
}
