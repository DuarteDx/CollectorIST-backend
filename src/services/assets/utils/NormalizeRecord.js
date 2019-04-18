export default (record) => {
  return {
    ...record.sources[record.preferedSource].record,
    metadata: {
      id: record.id,
      recordState: record.sources[record.preferedSource].recordState
    }
  }
}
