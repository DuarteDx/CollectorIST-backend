import RegisterCategoriesService from '@/services/collections/RegisterCategoriesService'

const handler = async (request, h) => {
  return RegisterCategoriesService(request.payload.file, request.params.token)
}

const config = {
  description: 'Register categories',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
      /* type: 'user-session',
      roles: ['user'] */
    }
  }
}

export default { handler, config }
