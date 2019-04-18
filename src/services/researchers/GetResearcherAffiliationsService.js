import MongoPaginationUtil from '@/utils/MongoPaginationUtil'
import ResearcherAffiliationSchema from '@/schemas/ResearcherAffiliationSchema'
import GetUnitSummaryInfoService from '@/services/units/GetUnitSummaryInfoService'

export default async ({ userId, skip, limit, sort }) => {
  const affiliationsPage = await MongoPaginationUtil.paginate({
    collection: 'users',
    pipeline: [
      { $match: { '_id': userId } },
      { $project: { affiliations: '$affiliations' } },
      { $unwind: '$affiliations' }
    ],
    skip,
    limit
  })
  const affiliationIDs = affiliationsPage.items.map((i) => i.affiliations.unitID)
  let units = await GetUnitSummaryInfoService()
  units = units.filter(unit => affiliationIDs.includes(unit.id))

  // Map unit ids to object keys
  const unitsObjects = Object.assign({}, ...units.map(item => ({ [item['id']]: item })))
  // Merge unit information
  affiliationsPage.items = affiliationsPage.items.map((i) => i.affiliations).map((affiliation) => {
    affiliation.unit = {
      id: affiliation.unitID,
      acronym: unitsObjects[affiliation.unitID].acronym,
      name: unitsObjects[affiliation.unitID].name,
      path: unitsObjects[affiliation.unitID].path
    }
    return ResearcherAffiliationSchema(affiliation)
  })
  return affiliationsPage
}
