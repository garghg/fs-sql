require('dotenv').config()
const express = require('express')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logoutRouter = require('./controllers/logout')
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readingLists')
const { PORT } = require('./utils/config')
const { connectToDB } = require('./utils/db')
const { errorHandler } = require('./controllers/middleware')
const { Blog, User, Session, ReadingList } = require('./models')

const app = express()

app.get('/', (req, res) => {
  return res.status(200).end()
})

app.post('/api/reset', async (req, res) => {
  await Session.destroy({ where: {} })
  await ReadingList.destroy({ where: {} })
  await Blog.destroy({ where: {} })
  await User.destroy({ where: {} })
  res.status(204).end()
})

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use('/api/logout', logoutRouter)
app.use('/api/authors', authorRouter)
app.use('/api/readinglists', readingListRouter)
app.use(errorHandler)

const start = async () => {
  await connectToDB()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
