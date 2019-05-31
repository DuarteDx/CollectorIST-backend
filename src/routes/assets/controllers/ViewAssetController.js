import GetAssetService from '@/services/assets/GetAssetService'
// import Joi from 'joi'

const handler = async (request, h) => {
  console.log(request.params.token)
  var requestedAsset = {
    id: request.params.id,
    token: request.params.token
  }
  const asset = await GetAssetService(requestedAsset)
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
