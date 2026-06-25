const router = require("express").Router()
const { User } = require("../models")

router.get("/", async (req, res) => {
    const users = await User.findAll()
    console.log(users)
    res.json(users)
})

router.post("/", async (req, res, next) => {
    try {
        const user = await User.create(req.body)
        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.put("/:username", async (req, res, next) => {
    try {
        const user = await User.findOne({ where: { username: req.params.username } })
        user.username = req.body.username
        await user.save()
        res.json(user)
    } catch (error) {
        next(error)
    }
})

module.exports = router