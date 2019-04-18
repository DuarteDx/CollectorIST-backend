import GetUserFromUserId from './GetUserFromUserId'
import GetUserIdFromUsernameService from './GetUserIdFromUsernameService'
import UpdateUserUsernameService from '@/services/users/UpdateUserUsernameService'

export default async ({ username, authorUserId }) => {
  const user = await GetUserFromUserId({ userId: authorUserId })
  if (user.username !== username) {
    const userWithUsername = await GetUserIdFromUsernameService({ username })
    if (!userWithUsername) {
      await UpdateUserUsernameService({ userId: authorUserId, username })
      return {
        ok: true
      }
    } else {
      return {
        ok: false
      }
    }
  } else {
    return {
      ok: true
    }
  }
}
