const Bcrypt = require('../utilities/bcrypt')
const Jwt = require('../utilities/jwt')

// const { redis } = require('../config/redis')
const config = require('../config/index')

const UserAPI = require('../apis/user.api')
const RefreshTokenAPI = require('../apis/refreshToken.api')

class AuthController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body
      const { data: user } = await UserAPI.get('/', { data: { username } })
      
      if (!user) {
        return res.status(401).send({ message: 'Oops! Your username and/or password is invalid 😮' })
      }
      
      const isPasswordValid = await Bcrypt.compare(password, user.password)
      
      if (!isPasswordValid) {
        return res.status(401).send({ message: 'Oops! Your username and/or password is invalid 😮' })
      }
      
      const accessToken = Jwt.sign({ userId: user._id, username, role: user.role })
      const { data: refreshToken } = await RefreshTokenAPI.post('/', { userId: user._id, username })

      // await redis.set(accessToken, accessToken, { EX: config.redis.ttl })

      return res.send({ accessToken, refreshToken, message: 'Welcome! 😃' })
    } catch (error) {
      next(error)   
    }
  }
    
  static async refreshToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      const { refreshToken: refreshTokenBody } = req.body
      
      if (!token) {
        return res.status(400).send({ message: 'Oops! Refresh token is invalid 😞' })
      }
      
      const { userId, username, role } = Jwt.verify(token, { ignoreExpiration: true })
      const { data: refreshToken } = await RefreshTokenAPI.get('/', { 
        data: { userId, username, refreshToken: refreshTokenBody } 
      })
      ;
      if (!refreshToken) {
        return res.status(400).send({ message: 'Oops! Refresh token is invalid 😞' })
      }
      
      if (new Date() > new Date(refreshToken.expiredAt)) {
        return res.status(400).send({ message: 'Your refresh token is expired, please login again 😊' })
      }
      
      // await redis.del(token)
      const accessToken = Jwt.sign({ userId, username, role })

      // await redis.set(accessToken, accessToken, { EX: config.redis.ttl })
      
      return res.send({ accessToken, message: 'Here is your new access token! 😀' })
    } catch (error) {
      next(error) 
    }
  }
  
  static async logout(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      const { userId, username } = req.user
      
      await RefreshTokenAPI.delete('/', { data: { userId, username } })

      // await redis.del(token)
      
      return res.send({ message: 'See you! 🤗' })
    } catch (error) {
      next(error)
    }
  }

  static async hello(_, res) {
    // await redis.set('hap', 'hap')
    const { data: result } = await RefreshTokenAPI.get('/hello')
    return res.send(result)
  }

}

module.exports = AuthController
