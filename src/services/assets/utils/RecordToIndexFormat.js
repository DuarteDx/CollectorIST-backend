import NormalizeObject from '@/schemas/NormalizeObject'
import NormalizeRecord from '@/services/records/utils/NormalizeRecord'

export default (metadata) => {
  const metadataNormalize = NormalizeRecord(NormalizeObject(metadata))
  const fields = ['doi', 'isbn', 'units', 'author', 'journal', 'journal', 'year', 'month', 'template']
  const record = {
    title: metadataNormalize.title
  }
  for (const key in metadataNormalize) {
    if (fields.includes(key)) {
      record[key] = metadataNormalize[key]
    }
  }
  if (metadataNormalize.year) {
    record.date = new Date(metadataNormalize.year + '-' + metadataNormalize.month)
  } else if (metadataNormalize.date) {
    record.date = new Date(metadataNormalize.date)
  } else if (metadataNormalize.registrationdate) {
    record.date = new Date(metadataNormalize.registrationdate)
  }
  record.id = metadataNormalize.metadata.id
  return record
}
