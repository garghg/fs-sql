const router = require("express").Router()
const Blog = require('../models')
const { blogFinder } = require("./middleware")

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body)
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