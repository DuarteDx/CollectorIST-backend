// import ListedUnitMemberSchema from '@/schemas/ListedUnitMemberSchema'
import MongoPaginationUtil from '@/utils/MongoPaginationUtil'

export default async ({ unitID, skip, limit, sort, q, verified, ended }) => {
  const $elemMatch = {
    'unitID': unitID
  }
  if (verified !== undefined) {
    $elemMatch.verified = verified
  }
  if (ended !== undefined) {
    $elemMatch.end = ended ? { '$ne': null } : null
  }
  const paginatedUnitMembers = await MongoPaginationUtil.paginate({
    collection: 'users',
    pipeline: [
      {
        $match: {
          'roles': 'researcher',
          'affiliations': {
            $elemMatch
          }
        }
      }
    ],
    skip,
    limit
  })
  paginatedUnitMembers.items = paginatedUnitMembers.items.map((i) => {
    let start
    let end
    for (const affiliation of i.affiliations) {
      if (affiliation.unitID === unitID) {
        start = affiliation.start
        end = affiliation.end
        break
      }
    }
    return {
      avatar: i.avatar,
      name: i.name,
      username: i.username,
      id: i._id,
      start,
      end
    }
  })
  return paginatedUnitMembers
}
