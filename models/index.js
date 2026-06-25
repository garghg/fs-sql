const { sequelize } = require('../utils/db')
const Blog = require('./blog')
const User = require('./user')

Blog.belongsTo(User)
User.hasMany(Blog)

sequelize.sync({ alter: true })

module.exports = {
  Blog, User
}