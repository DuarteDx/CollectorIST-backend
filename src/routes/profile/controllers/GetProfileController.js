import GetUserProfileService from '@/services/profile/GetProfileService'

const handler = async (request, h) => {
  return GetUserProfileService({ userId: request.getPrincipal().username })
}

const config = {
  description: 'Get user profile',
  plugins: {
    'porg-auth': {
      type: 'user-session',
      roles: ['user']
    }
  }
}

export default { handler, config }
