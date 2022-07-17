// const { redis } = require('../config/redis')

const UserAPI = require('../apis/user.api')

class UsersController {
  static async register(req, res, next) {
    try {
      const { fullname, age, username, password, role } = req.body
      const { data: isUsernameUsed } = await UserAPI.get('/', { data: { username } }) 

      if (isUsernameUsed) {
        return res.status(400).send({ message: 'Sorry, username has already been used 😞' })
      }
  
      await UserAPI.post('/', { fullname, age, username, password, role })
  
      return res.status(201).send({ message: 'Yeay! You are now registered 😎' })
    } catch (error) {
      next(error)
    }
  }

  static async getMyProfile(req, res, next) {
    try {
      const { userId } = req.user
      const { data: user } = await UserAPI.get(`/${userId}`)
      
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  static async getUsers(req, res, next) {
    try {
      const { data: users } = await UserAPI.get('/list')
      
      return res.send(users)
    } catch (error) {
      next(error)
    }
  }

  static async getUser(req, res, next) {
    try {
      const { userId } = req.params
      const { data: user } = await UserAPI.get(`/${userId}`)
      
      if (!user) {
        res.status(400).send({ message: 'User not found 🙁' })
      }
      
      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  static async editUser(req, res, next) {
    try {
      const { userId } = req.params
      const { fullname, age } = req.body
      const { data: user } = await UserAPI.put(`/${userId}`, { fullname, age })
      
      if (!user.value) {
        return res.status(400).send({ message: 'User not found 🙁' })
      }
      
      return res.send({ message: 'Successfully updated!' })
    } catch (error) {
      next(error)
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { userId } = req.params
      const { data: user } = await UserAPI.delete(`/${userId}`)
      
      if (!user.value) {
        res.status(400).send({ message: 'User not found 🙁' })
      }
      
      return res.send({ message: 'Successfully deleted!' })
    } catch (error) {
      next(error)
    }
  }

  static async hello(_, res) {
    // await redis.set('hap', 'hap')
    const { data: result } = await UserAPI.get('/hello')
    return res.send(result)
  }
}

module.exports = UsersController
