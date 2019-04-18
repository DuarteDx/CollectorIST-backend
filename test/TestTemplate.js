import test from 'tape-promise/tape'
import { config, logger, setConfig, startServer, TestUtils } from 'porg'
setConfig({ basePath: __dirname })
process.on('unhandledRejection', (reason, p) => {
  // application specific logging, throwing an error, or other logic here
  logger(['error', 'testing', 'migration'], `Unhandled Rejection at: Promise ${p} reason ${JSON.stringify(reason)}`)
})

let server
const testCaseRunner = (name, cb) => {
  test(name, function (t) {
    t.test('setup', async function (t) {
      logger(['info', 'testing', 'test'], `Setup testing`)
      await TestUtils.cleanDbs({ config })
      server = await startServer({
        config,
        runOnce: () => {
        }
      })
      logger(['info', 'testing', 'test'], `Server finish init`)
      t.end()
    })

    cb(t)

    t.test('teardown', async function (t) {
      logger(['info', 'testing', 'test'], `Teardown testing`)
      await server.stop()
      await TestUtils.closeDbs({ config })
      logger(['info', 'testing', 'test'], `Finish testing`)
      t.end()
    })
  })
}

export {
  logger,
  testCaseRunner,
  server
}
