import ListCategoriesService from '@/services/categories/ListCategoriesService'

const handler = async (request, h) => {
  const categories = await ListCategoriesService()
  return categories
}

const config = {
  description: 'List categories',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
