import Joi from 'joi'
import SyncExternalRepositoryResearcherService from '@/services/researchers/SyncExternalRepositoryResearcherService'

const handler = async (request, h) => {
  return SyncExternalRepositoryResearcherService({
    userId: request.getPrincipal().username,
    provider: request.params.provider
  })
}

const config = {
  description: 'Handle external repository sync for user',
  validate: {
    params: {
      provider: Joi.string().valid(['orcid', 'scopus', 'dblp']).required()
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
