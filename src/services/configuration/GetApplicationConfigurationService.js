import { Mongo } from 'porg'

export default async ({ hostname }) => {
  const db = await Mongo.getDB()
  const unitsWithConfiguration = await db.collection('units').find({
    configuration: { $exists: true }
  }).toArray()
  const unitsMap = {}
  for (let unit of unitsWithConfiguration) {
    unitsMap[unit.configuration.domain] = unit
  }
  if (unitsMap[hostname]) {
    return unitsMap[hostname].configuration
  } else {
    return {
      domain: 'scholar.ulisboa',
      logo: 'logo-ulisboa.svg'
    }
  }
}
