import ListUsersService from '@/services/users/ListUsersService'

const handler = async (request, h) => {
  const users = await ListUsersService()
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
