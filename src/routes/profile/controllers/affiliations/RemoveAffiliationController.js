import RemoveAffiliationService from '@/services/profile/RemoveAffiliationService'
import Joi from 'joi'

const handler = async (request, h) => {
  return RemoveAffiliationService({
    userId: request.getPrincipal().username,
    id: request.params.id
  })
}

const config = {
  description: 'Removes an existing affiliation of the authenticated user',
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
