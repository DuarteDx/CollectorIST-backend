import AddEmailService from '@/services/profile/emails/AddEmailService'
import Joi from 'joi'

const handler = async (request, h) => {
  return AddEmailService({
    userId: request.getPrincipal().username,
    email: request.payload.email,
    primary: request.payload.primary
  })
}

const config = {
  description: 'Add an email for the authenticated user',
  validate: {
    payload: {
      email: Joi.string().email().lowercase().required(),
      primary: Joi.boolean().default(false)
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
