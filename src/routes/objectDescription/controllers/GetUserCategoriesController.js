import GetUserCategoriesService from '@/services/components/objectDescription/GetUserCategoriesService'

const handler = async (request, h) => {
  return GetUserCategoriesService(request.params.token)
}

const config = {
  description: 'Get categories associated to user (Object Description)',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
