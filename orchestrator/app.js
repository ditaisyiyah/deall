const express = require('express')

const config = require('./config/index')
const { connectRedis } = require('./config/redis')
const router = require('./routes')

const app = express()
const port = config.app.port || 3000

async function main() {

  await connectRedis()

  app.use(express.json())

  app.use(router)
  app.use((error, _, res) => {
    res.send(error);
  })

  app.listen(port, () => console.log(`App listens and serves on http://localhost:${port}`))

}

main().catch((error) => console.log(error))
