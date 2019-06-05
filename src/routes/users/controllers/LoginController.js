import LoginService from '@/services/users/LoginService'

const handler = async (request, h) => {
  const user = await LoginService({
    istTokens: request.payload.data
  })
  return user
}

const config = {
  description: 'Login',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
