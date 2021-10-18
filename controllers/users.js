const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const { response } = require('express')
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users.map(blog => blog.toJSON()))
})

usersRouter.post('/', async (req, res) => {
    const b = req.body

    if (b.password.length < 3) {
        return res.status(400).json({ error: 'Password too short'})
    }
    const saltRounds = 10
    const passHash = await bcrypt.hash(b.password, saltRounds)

    const user = new User({
        username: b.username,
        name: b.name,
        passwordHash: passHash,
    })

    const savedUser = await user.save()

    res.json(savedUser)
})

usersRouter.delete('/', async (req, res) => {
    await User.deleteMany({})
    response.status(204)
})
/* usersRouter.put('/:id', async (req, res) => {
    const b = req.body
    const id = { _id: req.params.id }
    const user = {
        username: b.username,
        password: b.password,
        name: b.name
    }

    await User.findOneAndUpdate(id, user, { new: true })
    res.status(200).end()
}) */

/* usersRouter.delete('/:id', async (req, res) => {
    await User.findByIdAndRemove(req.params.id)
    res.status(204).end()
}) */

module.exports = usersRouter