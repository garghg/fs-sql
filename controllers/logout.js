const { Session } = require("../models")
const { tokenExtractor } = require("./middleware")
const router = require("express").Router()

router.delete('/', tokenExtractor, async (req, res) => {
    const session = await Session.destroy({ where: {token: req.token} })
    res.status(204).end()
})

module.exports = router