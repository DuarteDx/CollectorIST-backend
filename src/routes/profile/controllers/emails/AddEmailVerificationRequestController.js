import AddEmailVerificationRequestService from '@/services/profile/emails/AddEmailVerificationRequestService'
import Joi from 'joi'

const handler = async (request, h) => {
  return AddEmailVerificationRequestService({
    userId: request.getPrincipal().username,
    emailId: request.params.id
  })
}

const config = {
  description: 'Create an email verification request authenticated user',
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
