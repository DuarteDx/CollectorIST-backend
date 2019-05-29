import ListCollectionsService from '@/services/collections/ListCollectionsService'

const handler = async (request, h) => {
  const collections = await ListCollectionsService()
  return collections
}

const config = {
  description: 'List collections',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
