require('dotenv').config()

module.exports = {
  app: { 
    port: process.env.PORT,
  },
  refreshToken: {
    host: process.env.REFRESH_TOKEN_HOST,
    port: process.env.REFRESH_TOKEN_PORT,
  },
  user: {
    host: process.env.USER_HOST,
    port: process.env.USER_PORT,
  },
  jwt: { 
    privateKey: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRED
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    ttl: process.env.REDIS_TTL
  }

}