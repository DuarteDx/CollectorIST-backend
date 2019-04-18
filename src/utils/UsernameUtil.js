import generateNanoid from 'nanoid/generate'
import slugify from 'slugify'
import GetUserFromUserId from '@/services/users/GetUserFromUserId'

const generate = ({ fullName }) => {
  const nameParts = fullName.split(/\s+/)
  const firstName = nameParts[0]
  const lastName = nameParts[nameParts.length - 1]
  let candidate = ''
  let entropyLevel = -1
  do {
    entropyLevel++
    if (entropyLevel > 0) {
      candidate = slugify(`${firstName}${lastName}${generateNanoid('1234567890', entropyLevel)}`)
    } else {
      candidate = slugify(`${firstName}${lastName}`, {
        lower: true
      })
    }
  } while (!isUsernameAvailable(candidate))
  return candidate
}

async function isUsernameAvailable ({ userId }) {
  const user = await GetUserFromUserId({ userId })
  return user === null
}

export default {
  generate,
  isUsernameAvailable
}
