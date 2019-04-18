import { Task } from '@/schemas/TaskSchema'

import MongoPaginationUtil from '@/utils/MongoPaginationUtil'
import MongoPipelineSortUtil from '@/utils/MongoPipelineSortUtil'

export default async ({ userId, skip, limit, sort, state, type }) => {
  console.log(sort)
  const tasksPage = await MongoPaginationUtil.paginate({
    collection: 'scholar-tasks',
    pipeline: [
      { $match: { 'stakeholders': { $in: [userId] }, 'type': type, 'state': state } },
      { $sort: MongoPipelineSortUtil.translate(sort) }
    ],
    skip,
    limit
  })
  tasksPage.items = tasksPage.items.map(Task)
  return tasksPage
}
