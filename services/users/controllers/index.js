const UserModel = require('../models')

const Bcrypt = require('../utilities/bcrypt')

class Controller {
  static async hello(_, res) {
    return res.send({ message: `Kecoa Terbang di user` })
  }

  static async findOne(req, res, next) {
    try {
      const { username } = req.body
      const user = await UserModel.findOne({ username })
      
      return res.send(user)
    
    } catch (error) {
      next(error)
    }
  }

  static async create(req, res, next) {
    try {
      const { fullname, age, username, password, role } = req.body

      await UserModel.create({
        fullname: fullname || username,
        age,
        username,
        password: await Bcrypt.hash(password),
        role: role || 'user'
      })
  
      return res.status(201).send({ message: 'Yeay! You are now registered 😎' })
    } catch (error) {
      next(error)
    }
  }

  static async findById(req, res, next) {
    try {
      const { userId } = req.params
      const user = await UserModel.findById(userId)
      
      if (!user) throw ({ name: 'NotFound' })
      
      return res.send(user)
    
    } catch (error) {
      next(error)
    }
  }

  static async find(_, res, next) {
    try {
      const users = await UserModel.find()
      
      return res.send(users)
    } catch (error) {
      next(error)
    }
  }

  static async update(req, res, next) {
    try {
      const { userId } = req.params
      const { fullname, age } = req.body
      const user = await UserModel.findByIdAndUpdate(userId, { fullname, age }, { new: true })

      if (!user.value) throw ({ name: 'NotFound' })
      
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  static async delete(req, res, next) {
    try {
      const { userId } = req.params
      const user = await UserModel.findByIdAndDelete(userId)
      
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = Controller
