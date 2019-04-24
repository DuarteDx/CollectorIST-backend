import GetAssetService from '@/services/assets/GetAssetService'
// import Joi from 'joi'

const handler = async (request, h) => {
  const asset = await GetAssetService({ id: request.params.id })
  return asset
}

const config = {
  description: 'Get an asset',
  /* validate: {
    params: {
      id: Joi.string().required()
    }
  }, */
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
