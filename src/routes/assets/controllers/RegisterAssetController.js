import RegisterAssetService from '@/services/assets/RegisterAssetService'

const handler = async (request, h) => {
  console.log(request.payload)
  return RegisterAssetService(request.params.token, request.payload)
}

const config = {
  description: 'Register a new asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
      /* type: 'user-session',
      roles: ['user'] */
    }
  }
}

export default { handler, config }
