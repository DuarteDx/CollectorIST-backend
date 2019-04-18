import GetProfileSettingsService from '@/services/profile/GetProfileSettingsService'

const handler = async (request, h) => {
  return GetProfileSettingsService({ userId: request.getPrincipal().username })
}

const config = {
  description: 'Get user profile general settings',
  plugins: {
    'porg-auth': {
      type: 'user-session',
      roles: ['user']
    }
  }
}

export default { handler, config }
