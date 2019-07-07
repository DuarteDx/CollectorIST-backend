import EditObjectHistoryService from '@/services/components/objectHistory/EditObjectHistoryService'

const handler = async (request, h) => {
  return EditObjectHistoryService(request.params.token, request.payload)
}

const config = {
  description: 'Edit object history from asset',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
