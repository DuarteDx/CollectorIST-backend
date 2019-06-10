import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (categories, token) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      var decodedToken = jwtDecode(token)
      if (!decodedToken.newUserToken2.role.admin) {
        return 'You do not have permissions to perform this action'
      }

      // Console output
      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' POST -> Insert all categories')

      // await db.collection('categories').insertOne(newCollection)

      // ToDo: add categories to DB
      let db = await Mongo.getDB()
      // ...

      // Create log
      var log = {
        time: today,
        action: 'Insert category',
        userId: decodedToken.newUserToken2.username,
        userName: decodedToken.newUserToken2.name
      }
      await db.collection('logs').insertOne(log)

      return 'Updated list of categories'
    }
  })
}
