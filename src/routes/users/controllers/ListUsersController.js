import ListUsersService from '@/services/users/ListUsersService'

const handler = async (request, h) => {
  var token = request.params.token
  console.log(token)
  const users = await ListUsersService(token)
  return users
}

const config = {
  description: 'List users',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
