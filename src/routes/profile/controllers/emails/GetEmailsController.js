import GetEmailsService from '@/services/profile/emails/GetEmailsService'

const handler = async (request, h) => {
  return GetEmailsService({
    userId: request.getPrincipal().username
  })
}

const config = {
  description: 'Get emails for the authenticated user',
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
