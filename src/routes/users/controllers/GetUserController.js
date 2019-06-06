import GetUserService from '@/services/users/GetUserService'

const handler = async (request, h) => {
  const users = await GetUserService(request.params.token, request.params.istId)
  return users
}

const config = {
  description: 'Get info of a single user',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
