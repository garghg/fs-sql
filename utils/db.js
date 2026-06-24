const Sequelize = require("sequelize")
const { DATABASE_URL } = require("./config")

const sequelize = new Sequelize(DATABASE_URL)

const connectToDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('connected to the database')
  } catch (err) {
    console.log('failed to connect to the database')
    return process.exit(1)
  }

  return null
}

module.exports = { connectToDB, sequelize }