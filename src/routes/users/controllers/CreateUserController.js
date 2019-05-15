import CreateUserService from '@/services/users/CreateUserService'

const handler = async (request, h) => {
  console.log(request.payload)
  const user = await CreateUserService(request.payload)
  return user
}

const config = {
  description: 'Register a new user',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
