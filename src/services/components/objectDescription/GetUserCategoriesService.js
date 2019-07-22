import { Mongo } from 'porg'
import jwtDecode from 'jwt-decode'

export default async (token) => {
  // Console output
  let today = new Date()
  let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds()
  console.log(time + ' GET -> User categories (Object Description)')

  // Get username from token
  let decodedToken = jwtDecode(token)
  let username = decodedToken.newUserToken2.username

  // Get config from DB
  let db = await Mongo.getDB()
  const user = await db.collection('users').findOne({ 'username': username })

  return user.role.collections
}
