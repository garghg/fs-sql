const jwt = require("jsonwebtoken")
const router = require("express").Router()
const { Op } = require('sequelize')
const { Blog, User } = require('../models')
const { blogFinder, tokenExtractor } = require("./middleware")

router.get('/', async (req, res) => {
    const where = {}

    if (req.query.search) {
        where.title = {
            [Op.iLike]: `%${req.query.search}%`
        }
    }

    const blogs = await Blog.findAll({
        include: {
            model: User,
            attributes: ['name']
        },
        attributes: {
            exclude: ['userId']
        },
        where
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

router.delete('/:id', tokenExtractor, blogFinder, async (req, res, next) => {
    const user = await User.findByPk(req.decodedToken.id)
    if (req.blog.userId === user.id) {
        await req.blog.destroy()
        return res.status(204).end()
    } else {
        const err = new Error("User Not Found")
        err.status = 400
        return next(err)
    }
})

router.put('/:id', blogFinder, async (req, res) => {
    req.blog.likes = req.body.likes
    await req.blog.save()
    res.json(req.blog)
})

module.exports = router