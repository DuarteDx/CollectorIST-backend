import hash from 'hash.js'
import GetUserFromUserId from '@/services/users/GetUserFromUserId'
import CreateUserService from '@/services/users/CreateUserService'
import AddEmailService from '@/services/profile/emails/AddEmailService'

import UsernameUtil from '@/utils/UsernameUtil'
import gravatar from 'gravatar'
import { logger } from 'porg'

const tags = ['auth', 'jwt', 'security', 'GetJwtPayloadForUsername', 'service']

export default async (ctx) => {
  const userId = hash.sha256().update(ctx.eppn[0]).digest('hex')
  let user = await GetUserFromUserId({ userId })
  if (!user) {
    logger([...tags, 'info'], `Creating the user lazily with eppn ${ctx.eppn[0]}`)
    user = await CreateUserService({
      _id: userId,
      username: UsernameUtil.generate({ fullName: ctx.name[0] }),
      name: ctx.name[0],
      avatar: gravatar.url(ctx.mail[0]),
      updated: new Date(),
      wizardState: {
        completed: false
      },
      roles: ['user', 'researcher']
    })
    await AddEmailService({ userId, email: ctx.mail[0] })
  }
  logger([...tags, 'debug'], `Successfully generated a JWT for the user with eppn ${ctx.eppn[0]}`)
  return {
    sub: user._id,
    roles: user.roles
  }
}
