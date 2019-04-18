import metadataValidator from 'metadata-validator'
// import { Mongo, errorWithKey } from 'porg'

export default async () => {
  const addUserInDatabaseCheck = async (defaultMethod) => {
    const notAllUsersInDatabase = async ({ users }) => {
      // const db = await Mongo.getDB()
      // for (const user of users) {
      //   const userInfo = await db.collection('users').findOne({ _id: user })
      //   if (!userInfo) {
      //     return true
      //   }
      // }
      return false
    }
    return async (val) => {
      const result = await defaultMethod(val)
      if (val instanceof Array) {
        const users = val.filter((a) => a.userId).map((a) => a.userId)
        if (await notAllUsersInDatabase({ users })) {
          return { status: false, error: 'user-not-in-database' }
        }
      }
      return result
    }
  }

  return metadataValidator({
    'author': addUserInDatabaseCheck,
    'authorWithAtLeastOneLink': addUserInDatabaseCheck,
    'editor': addUserInDatabaseCheck,
    'editorWithAtLeastOneLink': addUserInDatabaseCheck
  })
}
