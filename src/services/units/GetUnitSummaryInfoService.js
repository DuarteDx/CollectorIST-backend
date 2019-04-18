import { Mongo } from 'porg'
import UnitSchema from '@/schemas/UnitSchema'

export default async () => {
  const db = await Mongo.getDB()
  const aux = {
    children: {},
    paths: {},
    parents: {},
    tree: {},
    units: {},
    count: { researchers: {}, publications: {} }
  }
  const userCount = await db.collection('users').aggregate([{ $match: { 'affiliations.unitID': { $exists: true } } }, { $unwind: '$affiliations' }, { $group: { _id: '$affiliations.unitID', count: { $sum: 1 } } }]).toArray()
  for (let entry of userCount) {
    aux.count.researchers[entry._id] = entry.count
  }

  const units = await db.collection('units').find().toArray()
  aux.originalUnits = units
  for (let unit of units) {
    aux.units[unit._id] = {
      id: unit._id,
      acronym: unit.acronym
    }
    if (unit.parentID && !aux.tree[unit.parentID]) { aux.tree[unit.parentID] = [] }
    if (unit.parentID) {
      aux.parents[unit._id] = unit.parentID
      aux.tree[unit.parentID].push(unit._id)
    }
  }
  for (let unit of units) {
    aux.children[unit._id] = getTransitiveChildren({ tree: aux.tree, id: unit._id, children: [] })
  }
  for (let unit of units) {
    aux.paths[unit._id] = computePathFor({ tree: aux.tree, units: aux.units, parents: aux.parents, current: unit._id, path: [] }).reverse()
  }
  for (let unit of units) {
    const userCounter = aux.children[unit._id].reduce((acc, child) => {
      if (aux.count.researchers[child]) {
        return acc + aux.count.researchers[child]
      } else {
        return acc
      }
    }, aux.count.researchers[unit._id] ? aux.count.researchers[unit._id] : 0)
    aux.count.researchers[unit._id] = userCounter
  }

  return units.map((unit) => {
    unit.stats = { researcherCount: aux.count.researchers[unit._id] }
    unit.path = aux.paths[unit._id]
    unit.hasSubUnits = aux.tree[unit._id] !== undefined && aux.tree[unit._id].length > 0
    return UnitSchema(unit)
  })
}

function computePathFor ({ tree, units, parents, current, path }) {
  if (parents[current]) {
    return computePathFor({ tree, parents, units, current: parents[current], path: path.concat(units[parents[current]]) })
  } else {
    return path
  }
}

function getTransitiveChildren ({ tree, id, children }) {
  if (tree[id]) {
    return tree[id].reduce((acc, unitId) => {
      return acc.concat(getTransitiveChildren({ tree, id: unitId, children: [] }))
    }, tree[id])
  } else {
    return children
  }
}
