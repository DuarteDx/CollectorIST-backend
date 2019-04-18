import UpdateEmailService from '@/services/profile/emails/UpdateEmailService'
import UpdateEmailVerificationRequest from '@/services/profile/emails/UpdateEmailVerificationRequest'
import Joi from 'joi'

const handler = async (request, h) => {
  if (request.payload.token) {
    return UpdateEmailVerificationRequest({
      userId: request.getPrincipal().username,
      emailId: request.params.id,
      token: request.payload.token
    })
  } else {
    return UpdateEmailService({
      userId: request.getPrincipal().username,
      emailId: request.params.id,
      ...request.payload.primary && { primary: request.payload.primary }
    })
  }
}

const config = {
  description: 'Update email details for the authenticated user',
  validate: {
    params: {
      id: Joi.string().required()
    },
    payload: Joi.alternatives().try(
      {
        token: Joi.string().required()
      },
      {
        primary: Joi.boolean().required()
      }
    )
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
