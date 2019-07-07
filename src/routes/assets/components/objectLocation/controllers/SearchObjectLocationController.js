import SearchObjectLocationService from '@/services/components/objectLocation/SearchObjectLocationService'

const handler = async (request, h) => {
  return SearchObjectLocationService(request.params.token, request.payload)
}

const config = {
  description: 'Search object Location from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
