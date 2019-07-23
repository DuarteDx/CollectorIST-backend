import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'
const jwt = require('jsonwebtoken')

export default async (token) => {
  return jwt.verify(token, 'secretKey', async (err, authData) => {
    if (err) {
      return '403 Forbidden!'
    } else {
      var decodedToken = jwtDecode(token)
      var username = decodedToken.newUserToken2.username

      let today = new Date()
      let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
      console.log(time + ' GET -> Is user admin? (' + username + ')')

      // Fetch data from DB
      let db = await Mongo.getDB()
      const user = await db.collection('users').findOne({ 'username': username })

      if (user.role.admin) {
        return true
      } else {
        return false
      }
    }
  })
}
