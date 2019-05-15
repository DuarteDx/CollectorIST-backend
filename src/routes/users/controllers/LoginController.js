import LoginService from '@/services/users/LoginService'

const handler = async (request, h) => {
  console.log(request)
  const user = await LoginService({
    clientUser: request.payload
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
