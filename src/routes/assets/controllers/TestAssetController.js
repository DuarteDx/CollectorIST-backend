import TestAssetService from '@/services/assets/TestAssetService'
// import Joi from 'joi'

const handler = async () => {
  const asset = await TestAssetService()
  return asset
}

const config = {
  description: 'Test an asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
