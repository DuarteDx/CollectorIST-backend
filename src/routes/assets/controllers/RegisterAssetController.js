import RegisterAssetService from '@/services/assets/RegisterAssetService'

const handler = async (request, h) => {
  return RegisterAssetService({
    author: request.getPrincipal().username,
    asset: request.payload
  })
}

const config = {
  description: 'Register a new asset',
  plugins: {
    'porg-auth': {
      type: 'user-session',
      roles: ['user']
    }
  }
}

export default { handler, config }
