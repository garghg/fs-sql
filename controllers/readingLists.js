const router = require('express').Router()
const { Blog, User, ReadingList } = require('../models')
const { errorHandle } = require('../controllers/middleware')

router.post('/', async (req, res, next) => {
    try {
        const blog = await ReadingList.create({ ...req.body })
        res.json(blog)
    } catch {
        const err = new Error('Invalid blog Id or user Id')
        err.status = 400
        next(err)
    }
})

module.exports = router