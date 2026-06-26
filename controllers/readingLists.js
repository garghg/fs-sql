const router = require('express').Router()
const { Blog, User, ReadingList } = require('../models')
const { errorHandle } = require('../controllers/middleware')
const { tokenExtractor } = require('../controllers/middleware')
const { createError } = require('../utils/utils')

router.post('/', async (req, res, next) => {
    try {
        const blog = await ReadingList.create({ ...req.body })
        res.json(blog)
    } catch {
        next(createError('Invalid blog Id or user Id', 400))
    }
})

router.put('/:id', tokenExtractor, async (req, res, next) => {
    try {
        const readingItem = await ReadingList.findByPk(req.params.id)
        if (!readingItem){
            throw createError('Invalid reading item id', 400)
        }
        if (req.decodedToken.id !== readingItem.userId) {
            throw createError('Unauthorized action', 403)
        }
        readingItem.read = req.body.read
        await readingItem.save()
        res.json(readingItem)
    } catch (error) {
        next(error)
    }
})

module.exports = router