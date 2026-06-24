const blogFinder = async (req, res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    if (!req.blog) {
        next(error)
    }
    next()
}

const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({ error })
}

module.exports = {
    blogFinder, 
    errorHandler
}