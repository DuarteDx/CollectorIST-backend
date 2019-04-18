import RemoveExternalProfileService from '@/services/profile/RemoveExternalProfileService'
import Joi from 'joi'

const handler = async (request, h) => {
  return RemoveExternalProfileService({
    userId: request.getPrincipal().username,
    provider: request.params.provider
  })
}

const config = {
  description: 'Remove external profile for the authenticated user',
  validate: {
    params: {
      provider: Joi.string().required()
    }
  },
  plugins: {
    'porg-auth': {
      type: 'user-session',
      roles: ['user', 'admin']
    }
  }
}

export default { handler, config }
