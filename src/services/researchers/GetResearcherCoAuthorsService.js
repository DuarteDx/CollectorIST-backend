import MongoPaginationUtil from '@/utils/MongoPaginationUtil'
import { Mongo } from 'porg'
import ResearcherCoAuthorsSchema from '@/schemas/ResearcherCoAuthorsSchema'
import { errorWithKey } from 'porg/dist/plugins/errors'
import GetResearcherService from './GetResearcherService'

export default async ({ userId, skip, limit, sort }) => {
  const researcher = await GetResearcherService({ userId })

  if (!researcher) {
    throw errorWithKey('researcher-not-found', { userId })
  }

  const coAuthorsPage = await MongoPaginationUtil.paginate({
    collection: 'users',
    pipeline: [
      { $match: { userId } },
      { $project: { coAuthors: '$coAuthors' } },
      { $unwind: '$coAuthors' }
    ],
    skip,
    limit
  })

  let db = await Mongo.getDB()
  const coAuthorsIDs = coAuthorsPage.items.map((i) => i.coAuthors.id)
  const coAuthors = await db.collection('users').find({ _id: { $in: coAuthorsIDs } }).toArray()

  // Map coAuthor ids to object keys
  const coAuthorsObjects = Object.assign({}, ...coAuthors.map(item => ({ [item['_id']]: item })))
  // Merge coAuthor information
  coAuthorsPage.items = coAuthorsPage.items.map((i) => i.coAuthors).map((coAuthor) => {
    coAuthor.name = coAuthorsObjects[coAuthor.id].name
    coAuthor.avatar = coAuthorsObjects[coAuthor.id].avatar
    coAuthor.username = coAuthorsObjects[coAuthor.id].username
    return ResearcherCoAuthorsSchema(coAuthor)
  })

  return coAuthorsPage
}
