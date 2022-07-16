require('dotenv').config()

module.exports = {
  app: { 
    port: process.env.PORT,
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT
  }

}