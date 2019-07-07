import SearchObjectHistoryService from '@/services/components/objectHistory/SearchObjectHistoryService'

const handler = async (request, h) => {
  return SearchObjectHistoryService(request.params.token, request.payload)
}

const config = {
  description: 'Search object history from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
