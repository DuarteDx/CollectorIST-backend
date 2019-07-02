import SearchAssetsService from '@/services/assets/SearchAssetsService'

const handler = async (request, h) => {
  return SearchAssetsService(request.url.query)
}

const config = {
  description: 'Search assets',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
