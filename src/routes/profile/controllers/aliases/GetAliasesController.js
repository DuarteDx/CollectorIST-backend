import GetAliasesService from '@/services/profile/GetAliasesService'

const handler = async (request, h) => {
  return GetAliasesService({
    userId: request.getPrincipal().username
  })
}

const config = {
  description: 'Get aliases for the authenticated user',
  plugins: {
    'porg-auth': {
      type: 'user-session',
      roles: ['user']
    }
  }
}

export default {
  handler,
  config
}
