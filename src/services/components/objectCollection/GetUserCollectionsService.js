import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (token) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      var decodedToken = jwtDecode(token)
      if (!decodedToken.newUserToken2.role.admin && !decodedToken.newUserToken2.role.editor) {
        return 'You do not have permissions to perform this action'
      }

      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + 'GET -> User collections')
      console.log(decodedToken.newUserToken2.username)

      // Define DB
      let db = await Mongo.getDB()

      let collections = []

      // If user is admin
      if (decodedToken.newUserToken2.role.admin) {
        let tempCollections = await db.collection('modules').findOne(
          { moduleName: 'objectCollection' }
        )
        tempCollections = tempCollections.collection.values
        tempCollections.forEach((collection) => {
          collections.push(collection.title)
        })
      }

      // If user is editor
      if (decodedToken.newUserToken2.role.editor) {
        collections = await db.collection('users').findOne(
          { username: decodedToken.newUserToken2.username }
        )
        collections = collections.role.collections
      }

      return collections
    }
  })
}
