import { tasks } from 'porg'

export default async ({ userId, provider }) => {
  if (provider === 'orcid') {
    await tasks.runTask({ name: 'SyncResearcherWithOrcidTask', input: { user: userId } })
  }
  if (provider === 'scopus') {
    await tasks.runTask({ name: 'SyncResearcherWithScopusTask', input: { user: userId } })
  }
  if (provider === 'dblp') {
    await tasks.runTask({ name: 'SyncResearcherWithDBLPTask', input: { user: userId } })
  }
  return { }
}
