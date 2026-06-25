const { Blog } = require('../models')
const { sequelize } = require('../utils/db')
const router = require('express').Router()

router.get('/', async (req, res) => {
  const authors = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [sequelize.fn('SUM', sequelize.col('likes')), 'likes'],
    ],
    order: [['likes', 'DESC']]
  })
  res.json(authors)
})


module.exports = router