import TestAuthService from '@/services/assets/TestAuthService'

const handler = async (request, h) => {
  console.log(request.payload)
  const response = await TestAuthService({ asset: request.payload })
  console.log(response)
  return response
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
