const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const blog = require('../models/blog')
const api = supertest(app)



describe('Tests with users and blogs populated', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        await blog.deleteMany({})
        await User.insertMany(helper.initialUsers)
        await blog.insertMany(helper.initialBlogs)
    })

    test('Get returns a populated json', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
        const users = await helper.usersInDb()
    })

    test('Another user can be created', async () => {
        usersAtStart = await helper.usersInDb()
        newUser = {
            username: 'V-V',
            password: 'salaisempisana',
            name: 'nimeni'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('User with a password of less than 3 characters cannot be created. Returns 400.', async () => {
        usersAtStart = await helper.usersInDb()

        newUser = {
            username: 'Vee-Vee',
            password: 'se',
            name: 'V-V'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    })

    test('User with a username with less than 3 characters cannot be created. Returns 400.', async () => {
        usersAtStart = await helper.usersInDb()

        newUser = {
            username: "VV",
            password: "NoProblem",
            name: "Whoever"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).not.toContain(newUser.username)
    })
})

afterAll(() => {
    mongoose.connection.close()
})