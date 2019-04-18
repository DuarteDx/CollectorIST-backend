import { config } from 'porg'

export default function ({ path }) {
  const port = (config.application.protocol === 'http' && config.application.frontendPort === 80) ||
      (config.application.protocol === 'https' && config.application.frontendPort === 443) ? '' : `:${config.application.frontendPort}`
  return `${config.application.protocol}://${config.application.host}${port}${path}`
}
