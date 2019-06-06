import ChangeUserRankService from '@/services/users/ChangeUserRankService'

const handler = async (request, h) => {
  return ChangeUserRankService(request.params.token, request.params.istId, request.params.newRank)
}

const config = {
  description: 'Assign a new rank to a user',
  plugins: {
    'porg-auth': {
      type: 'no-auth'
    }
  }
}

export default { handler, config }
