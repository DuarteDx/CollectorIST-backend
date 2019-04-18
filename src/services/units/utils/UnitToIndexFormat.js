import NormalizeObject from '@/schemas/NormalizeObject'
export default (unit) => {
  unit = NormalizeObject(unit)
  return {
    id: unit.id,
    acronym: unit.acronym,
    path: unit.path,
    type: unit.type,
    name: unit.name,
    email: unit.email,
    website: unit.website,
    parentID: unit.parentID,
    hasSubUnits: unit.hasSubUnits,
    stats: unit.stats
  }
}
