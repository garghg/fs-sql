const jwt = require('jsonwebtoken')
const { SECRET } = require('../utils/config')
const { Blog, Session, User } = require('../models')
const { createError } = require('../utils/utils')

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  if (!req.blog) {
    next(error)
  }
  next()
}

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      const decodedToken = jwt.verify(authorization.substring(7), SECRET)
      const session = await Session.findOne({
        where: { token: authorization.substring(7) },
      })
      if (!session) {
        return next(createError('Session expired', 401))
      }
      const user = await User.findByPk(decodedToken.id)
      if (user.disabled) {
        return next(createError('Account disabled', 401))
      }
      req.decodedToken = decodedToken
      req.token = authorization.substring(7)
      console.log(authorization.substring(7))
    } catch (error) {
      console.log(error)
      return next(createError('Token Invalid', 401))
    }
  } else {
    return next(createError('Not Logged In', 401))
  }
  next()
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'SequelizeValidationError') {
    const messages = error.errors.map((e) => e.message)
    return res.status(400).json({ error: messages })
  }
  res.status(error.status || 500).json({ error: error.message })
}

module.exports = {
  blogFinder,
  errorHandler,
  tokenExtractor,
}
