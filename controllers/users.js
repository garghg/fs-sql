const router = require('express').Router()
const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: {
        exclude: ['userId'],
      },
    },
  })
  console.log(users)
  res.json(users)
})

router.get('/:id', async (req, res) => {
  const users = await User.findByPk(req.params.id, {
    include: [
      {
        model: Blog,
        as: 'readings',
        through: {attributes: []},
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'userId'],
        },
      }
    ],
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'password'],
    },
  })
  console.log(users)
  res.json(users)
})

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

router.put('/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { username: req.params.username },
    })
    user.username = req.body.username
    await user.save()
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = router
