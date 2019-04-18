import MongoPaginationUtil from '@/utils/MongoPaginationUtil'
import ResearcherFundingSchema from '@/schemas/ResearcherFundingSchema'

export default async ({ userId, skip, limit, sort }) => {
  const fundingsPage = await MongoPaginationUtil.paginate({
    collection: 'fundings',
    pipeline: [
      { $match: { 'owner': userId } }
    ],
    skip,
    limit
  })
  fundingsPage.items = fundingsPage.items.map((funding) => ResearcherFundingSchema(funding))
  return fundingsPage
}
