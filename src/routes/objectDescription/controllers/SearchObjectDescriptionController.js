import SearchObjectDescriptionService from '@/services/components/objectDescription/SearchObjectDescriptionService'

const handler = async (request, h) => {
  return SearchObjectDescriptionService(request.params.token, request.payload)
}

const config = {
  description: 'Search object description from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
