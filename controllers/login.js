const jwt = require("jsonwebtoken")
const { User, Session } = require("../models")
const router = require("express").Router()
const { SECRET } = require("../utils/config")

router.post("/", async (req, res) => {
    const body = req.body

    const user = await User.findOne({
        where: {
            username: body.username
        }
    })

    const isPassCorrect = body.password === user.password

    if (!(user && isPassCorrect)) {
        return res.status(401).json({ error: 'Invalid username or password' })
    }

    const userForToken = {
        username: user.username,
        id: user.id
    }

    const token = jwt.sign(userForToken, SECRET)
    await Session.create({ userId: user.id, token })
    res.status(200).json({ token, username: user.username, name: user.name })
})

module.exports = router