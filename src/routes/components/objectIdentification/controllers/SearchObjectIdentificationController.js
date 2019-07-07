import SearchObjectIdentificationService from '@/services/components/objectIdentification/SearchObjectIdentificationService'

const handler = async (request, h) => {
  return SearchObjectIdentificationService(request.params.token, request.payload)
}

const config = {
  description: 'Search object identification from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
