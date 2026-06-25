const jwt = require("jsonwebtoken")
const { SECRET } = require("../utils/config")

const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog) {
        next(error)
    }
    next()
}

const tokenExtractor = async (req, res, next) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        try {
            req.decodedToken = jwt.verify(authorization.substring(7), SECRET)
        } catch {
            const err = new Error('Token Invalid')
            err.status = 401
            return next(err)
        }
    } else {
        const err = new Error('Not Logged In')
        err.status = 401
        return next(err)
    }
    next()
}

const errorHandler = (error, req, res, next) => {
    if (error.name === "SequelizeValidationError") {
        const messages = error.errors.map(e => e.message)
        return res.status(400).json({ error: messages })
    }
  res.status(error.status || 500).json({ error: error.message })
}

module.exports = {
    blogFinder, 
    errorHandler,
    tokenExtractor
}