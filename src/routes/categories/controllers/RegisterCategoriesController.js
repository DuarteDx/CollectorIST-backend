import RegisterCategoriesService from '@/services/categories/RegisterCategoriesService'

const handler = async (request, h) => {
  return RegisterCategoriesService(request.payload.categories, request.params.token)
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
