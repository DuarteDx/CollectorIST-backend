import GetCategoryService from '@/services/categories/GetCategoryService'

const handler = async (request, h) => {
  return GetCategoryService(request.params.id)
}

const config = {
  description: 'Get single category',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
