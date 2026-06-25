const jwt = require("jsonwebtoken")
const router = require("express").Router()
const { Blog, User } = require('../models')
const { blogFinder, tokenExtractor } = require("./middleware")

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll({
        include: {
            model: User,
            attributes: ['name']
        },
        attributes: {
            exclude: ['userId']
        }
    })
    res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res, next) => {
    try {
        const user = await User.findByPk(req.decodedToken.id)
        const blog = await Blog.create({ ...req.body, userId: user.id })
        return res.json(blog)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', blogFinder, async (req, res) => {
  await req.note.destroy()
  res.status(204).end()
})

router.put('/:id', blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})

module.exports = router