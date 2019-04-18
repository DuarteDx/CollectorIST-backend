import RemoveEmailService from '@/services/profile/emails/RemoveEmailService'
import Joi from 'joi'

const handler = async (request, h) => {
  return RemoveEmailService({
    userId: request.getPrincipal().username,
    emailId: request.params.id
  })
}

const config = {
  description: 'Remove and email for the authenticated user',
  validate: {
    params: {
      id: Joi.string().required()
    }
  },
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
