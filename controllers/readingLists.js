const router = require('express').Router()
const { Blog, User, ReadingList } = require('../models')
const { errorHandle } = require('../controllers/middleware')
const { tokenExtractor } = require('../controllers/middleware')
const { createError } = require('../utils/utils')

router.post('/', async (req, res, next) => {
  try {
    const { userId, blogId } = req.body
    if (!userId || !blogId) {
      return next(createError('userId and blogId are required', 400))
    }
    const user = await User.findByPk(userId)
    const blog = await Blog.findByPk(blogId)
    if (!user || !blog) {
      return next(createError('User or blog not found', 404))
    }
    const existing = await ReadingList.findOne({ where: { userId, blogId } })
    if (existing) {
      return next(createError('Blog already in reading list', 400))
    }
    const entry = await ReadingList.create({ userId, blogId })
    res.json({
      id: entry.id,
      user_id: entry.userId,
      blog_id: entry.blogId,
      read: entry.read,
    })
  } catch (error) {
    next(createError('Invalid blog Id or user Id', 400))
  }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
  try {
    const readingItem = await ReadingList.findByPk(req.params.id)
    if (!readingItem) {
      throw createError('Invalid reading item id', 404)
    }
    if (req.decodedToken.id !== readingItem.userId) {
      throw createError('Unauthorized action', 401)
    }
    readingItem.read = req.body.read
    await readingItem.save()
    res.json(readingItem)
  } catch (error) {
    next(error)
  }
})

module.exports = router
