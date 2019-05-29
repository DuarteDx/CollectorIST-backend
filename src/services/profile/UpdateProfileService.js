import { Mongo, errorWithKey } from 'porg'

export default async ({ userId, updatedProfile }) => {
  const fieldsToSet = {}
  if (updatedProfile.name) {
    fieldsToSet.name = updatedProfile.name
  }
  if (updatedProfile.username) {
    fieldsToSet.username = updatedProfile.username
  }
  if (updatedProfile.email) {
    fieldsToSet.email = updatedProfile.email
  }
  if (updatedProfile.aliases) {
    fieldsToSet.aliases = updatedProfile.aliases
  }
  if (updatedProfile.completeWizard) {
    fieldsToSet.wizardState = { completed: true }
  }
  if (updatedProfile.website) {
    fieldsToSet.website = updatedProfile.website
  }
  if (updatedProfile.bio) {
    fieldsToSet.bio = {
      ...updatedProfile.bio.short && { short: updatedProfile.bio.short },
      ...updatedProfile.bio.extended && { extended: updatedProfile.bio.extended }
    }
  }
  if (updatedProfile.fos) {
    fieldsToSet.fos = {
      ...updatedProfile.fos.primary && { primary: updatedProfile.fos.primary }
    }
  }
  if (updatedProfile.interests) {
    fieldsToSet.interests = updatedProfile.interests
  }

  if (updatedProfile.locale) {
    fieldsToSet.locale = updatedProfile.locale
  }
  const updateQuery = { $set: fieldsToSet }
  let db = await Mongo.getDB()
  let result = await db.collection('users').findOneAndUpdate({ '_id': userId }, updateQuery)
  if (!result.ok) {
    throw errorWithKey('user-not-found', { ctx: { userId } })
  }
}
