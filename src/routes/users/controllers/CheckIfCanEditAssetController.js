import CheckIfCandEditAssetService from '@/services/users/CheckIfCandEditAssetService'

const handler = async (request, h) => {
  console.log('Check if can edit controller')
  return CheckIfCandEditAssetService(request.params.assetId, request.params.token)
}

const config = {
  description: 'Indicates if current user can edit given asset (boolean)',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
