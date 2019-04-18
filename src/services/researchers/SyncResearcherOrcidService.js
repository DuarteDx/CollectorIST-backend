import { Mongo, logger } from 'porg'
import nanoid from 'nanoid'
import moment from 'moment'
import orcid from '@/services/orcid'
import StoreRecordService from '@/services/records/StoreRecordService'
import HasRecordService from '@/services/records/HasRecordService'
import TypeOfSources from '@/services/records/utils/TypeOfSources'
import RecordState from '@/services/records/utils/RecordState'
import OrcidEmailReport from '@/services/orcid/OrcidEmailReport'

// Maybe a usefull query db.getCollection('records').find({ "sources.entry.author": { $not: { $elemMatch: { "researcher": "ist13909" }}}})

export default async ({
  user
}) => {
  logger(['info', 'service', 'sync-researcher-orcid'], `Sync user with orcid ${user.externalProfiles.orcid.id} and name ${user.name}`, { userId: user._id, orcid: user.externalProfiles.orcid.id })
  const orcidID = user.externalProfiles.orcid.id
  const db = await Mongo.getDB()
  const timestamp = user.externalProfiles.orcid.lastSync || 0
  const info = {
    user
  }

  info.records = await syncUserWorksFromOrcid({ db, user, orcidID, timestamp })
  info.fundings = await syncUserFundingsFromOrcid({ db, user, orcidID, timestamp })

  await db.collection('users').findOneAndUpdate({ _id: user._id }, { $set: { 'externalProfiles.orcid.lastSync': moment().toDate() } })
  logger(['info', 'service', 'sync-researcher-orcid'], `Sync finished for user with orcid ${user.externalProfiles.orcid.id} and name ${user.name}`, { userId: user._id, orcid: user.externalProfiles.orcid.id })
  OrcidEmailReport({ info })
  return info
}

async function syncUserWorksFromOrcid ({ db, user, orcidID, timestamp }) {
  let importedWorks = await orcid.getDetailedWorks({
    username: user._id,
    name: user.name,
    orcidID,
    aliases: user.aliases ? user.aliases.map(alias => alias.value) : [],
    timestamp
  })
  const info = {
    valid: [],
    invalid: [],
    notProcessed: []
  }
  for (const work of importedWorks) {
    const journalEntryOrcid = {
      status: true
    }
    if (work.error) {
      journalEntryOrcid.status = false
      journalEntryOrcid.error = work.type
      journalEntryOrcid.work = work.work
      info.notProcessed.push(work.work)
    } else {
      const { record, trash, id, ignored } = work.export()
      journalEntryOrcid.putcode = id
      try {
        if (!await HasRecordService({ migratedFromId: id, source: TypeOfSources.orcid })) {
          const recordState = ignored.length > 0 ? RecordState.invalid : RecordState.valid
          await StoreRecordService({ record, sourceType: TypeOfSources.orcid, trash, migratedFromId: id, ignored, recordState })
          if (recordState === RecordState.valid) {
            info.valid.push(record.title)
          } else {
            info.invalid.push(record.title)
          }
        }
      } catch (err) {
        journalEntryOrcid.status = false
        journalEntryOrcid.error = err.message
        journalEntryOrcid.ctx = err.ctx
        journalEntryOrcid.work = { record, trash, id, ignored }
        info.notProcessed.push(record)
      }
    }
    await db.collection('journal-orcid').insertOne(journalEntryOrcid)
  }
  return info
}

async function syncUserFundingsFromOrcid ({ db, user, orcidID, timestamp }) {
  let detailedFundings = await orcid.getDetailedFundings({ orcidID, timestamp })
  detailedFundings = detailedFundings.map((funding) => {
    funding._id = nanoid()
    funding.owner = user._id
    return funding
  })
  if (detailedFundings && detailedFundings.length > 0) {
    await db.collection('fundings').insertMany(detailedFundings)
  }
  return detailedFundings.map(f => f.title)
}
