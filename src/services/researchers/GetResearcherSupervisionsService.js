import MongoPaginationUtil from '@/utils/MongoPaginationUtil'
import ResearcherSupervisionSchema from '@/schemas/ResearcherSupervisionSchema'

export default async ({ userId, skip, limit, sort }) => {
  const supervisionsPage = await MongoPaginationUtil.paginate({
    collection: 'users',
    pipeline: [
      { $match: { '_id': userId } },
      { $project: { supervisions: '$supervisions' } },
      { $unwind: '$supervisions' }
    ],
    skip,
    limit
  })
  const supervisions = supervisionsPage.items.map((i) => i.supervisions)
  supervisionsPage.items = supervisions.map((funding) => ResearcherSupervisionSchema(funding))

  return supervisionsPage
}
