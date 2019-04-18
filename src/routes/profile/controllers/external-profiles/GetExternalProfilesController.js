import GetExternalProfilesService from '@/services/profile/GetExternalProfilesService'

const handler = async (request, h) => {
  return GetExternalProfilesService({
    userId: request.getPrincipal().username
  })
}

const config = {
  description: 'Get external profiles for user',
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
