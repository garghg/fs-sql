const router = require("express").Router()
const Blog = require('../models')

router.get('/', async (req, res) => {
    const blogs = await Blog.findAll()
    res.json(blogs)
})

router.post('/', async (req, res) => {
    try {
        const blog = await Blog.create(req.body)
        return res.json(blog)
    } catch (error) {
        res.status(404).json({ error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id)
        await blog.destroy()
        res.json(blog)
    } catch (error) {
        res.status(404).json({ error })
    }
})

module.exports = router