require('dotenv').config()
const express = require('express')
const blogRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users")
const loginRouter = require("./controllers/login")
const { PORT } = require("./utils/config")
const { connectToDB } = require("./utils/db")
const { errorHandler } = require('./controllers/middleware')

const app = express()

app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)
app.use(errorHandler)

const start = async () => {
  await connectToDB()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()