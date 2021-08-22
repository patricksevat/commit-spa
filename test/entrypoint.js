require('ts-node').register(
  {
    transpileOnly: true,
    project: "./test/tsconfig.json"
  }
)
module.exports = require('./wdio.conf')
