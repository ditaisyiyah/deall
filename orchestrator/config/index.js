require('dotenv').config()

module.exports = {
  app: { 
    port: process.env.PORT,
    refreshTokenPort: process.env.REFRESH_TOKEN_PORT,
    userPort: process.env.USER_PORT,
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