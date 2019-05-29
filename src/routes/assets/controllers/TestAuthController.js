import TestAuthService from '@/services/assets/TestAuthService'

const handler = async (request, h) => {
  console.log(request.payload)
  const asset = await TestAuthService({ asset: request.payload })
  return asset
}

const config = {
  description: 'Test JWT',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
