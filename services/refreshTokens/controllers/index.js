const { v4: uuidv4 } = require('uuid')

const RefreshTokenModel = require('../models')

class Controller {
  static async hello(_, res) {
    return res.send({ message: `Kecoa Terbang di refresh token` })
  }
  
  static async upsert(req, res, next) {
    try {
      const { userId, username } = req.body

      const newRefreshToken = new uuidv4()
      const expiredAt = new Date()
      expiredAt.setSeconds(expiredAt.getSeconds() + 600)
  
      const isExist = await RefreshTokenModel.findOne({ userId, username })
  
      if (isExist) {
        await RefreshTokenModel.findOneAndUpdate({ userId, username }, { refreshToken: newRefreshToken, expiredAt })
      } else {
        await RefreshTokenModel.create({ userId, username, refreshToken: newRefreshToken, expiredAt})
      }
  
      return res.send({ refreshToken: newRefreshToken })
  
    } catch (error) {
      next(error)   
    }
  }

  static async findOne(req, res, next) {
    try {
      const { userId, username, refreshToken: refreshTokenBody } = req.body
  
      const refreshToken = await RefreshTokenModel.findOne({ userId, username, refreshToken: refreshTokenBody })
  
      return res.send(refreshToken)
      
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res) {
    const { userId, username } = req.body

    const result = await RefreshTokenModel.deleteOne({ userId, username })

    return res.send(result)
  }


}

module.exports = Controller
