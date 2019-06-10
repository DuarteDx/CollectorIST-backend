import ListCategoriesService from '@/services/collections/ListCategoriesService'

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
