import SaveExternalProfileKeyService from '@/services/profile/SaveExternalProfileKeyService'
import Joi from 'joi'

const handler = async (request, h) => {
  return SaveExternalProfileKeyService({
    userId: request.getPrincipal().username,
    provider: request.params.provider,
    key: request.params.key
  })
}

const config = {
  description: 'Remove external profile for the authenticated user',
  validate: {
    params: {
      provider: Joi.string().required(),
      key: Joi.string().required()
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
