import { Email, config, logger } from 'porg'

export default async ({ info }) => {
  const email = info.user.emails.filter(e => e.id === info.user.primaryEmail && e.verified)
  if (email.length === 1) {
    try {
      const records = info.records.valid
      const invalid = String(info.records.invalid.length)
      const valid = String(records.length)
      await Email.sendWithTemplate({
        from: config.noreplyEmail,
        to: email[0].email,
        template: 'orcid_report',
        context: {
          name: info.user.name,
          records,
          valid,
          invalid
        },
        locale: 'pt' // Refactor for user locale
      })
    } catch (err) {
      logger(['err', 'migration', 'orcid-email-report-service'], err)
    }
  }
}
