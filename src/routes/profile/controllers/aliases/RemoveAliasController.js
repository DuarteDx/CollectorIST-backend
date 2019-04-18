import RemoveAliasService from '@/services/profile/RemoveAliasService'
import Joi from 'joi'

const handler = async (request, h) => {
  return RemoveAliasService({
    userId: request.getPrincipal().username,
    alias: Buffer.from(request.params.alias, 'base64').toString()
  })
}

const config = {
  description: 'Remove a specific alias of the authenticated user',
  validate: {
    params: {
      alias: Joi.string().base64().required()
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
