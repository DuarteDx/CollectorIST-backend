import NormalizeObject from '@/schemas/NormalizeObject'
export default (user) => {
  user = NormalizeObject(user)
  return {
    id: user.id,
    username: user.id,
    name: user.name,
    avatar: user.avatar,
    roles: user.roles
  }
}
