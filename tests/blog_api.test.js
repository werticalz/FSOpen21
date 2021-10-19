const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const user = require('../models/user')
const api = supertest(app)

describe('Initial blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })
    test('are in JSON format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('have the right amount', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('return field id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})


describe('Posting tests:', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await user.deleteMany({})
        await user.insertMany(helper.initialUsers)
        await Blog.insertMany(helper.initialBlogs)

        const loginUser = {
            username: 'test',
            name: 'tester',
            password: 'administrator'
        }
        await api
            .post('/api/users')
            .set('Accept', 'application/json')
            .send(loginUser)
            .expect('Content-Type', /application\/json/)
    })
    test('posting a new blog works', async () => {
        const loginUser = {
            username: 'test',
            password: 'administrator'
        }
        const loggedUser = await api.post('/api/login').send(loginUser).expect(200)
        let token = `Bearer ${loggedUser.body.token}`

        const newBlog = {
            author: 'Meh!',
            title: 'About me',
            url: 'nonexistent',
            likes: 22
        }
        await api
            .post('/api/blogs')
            .set("Authorization", token)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('posting a blog with no likes value returns default value, 0', async () => {
        const loginUser = {
            username: 'test',
            password: 'administrator'
        }
        const loggedUser = await api.post('/api/login').send(loginUser).expect(200)
        const newBlog = {
            author: 'No-one',
            title: 'No title',
            url: 'www.nowhere.gone',
        }
        token = loggedUser.body.token

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(200)

        const response = await api
            .get('/api/blogs')
            .expect(200)

        response.body.forEach(e => {
            expect(e.likes).toBeDefined()
            e.title === 'No title'
                ? expect(e.likes).toEqual(0)
                : NaN
        })
    })

    test('posting a blog without either title or url returns 400', async () => {
        const loginUser = {
            username: 'test',
            password: 'administrator'
        }
        const loggedUser = await api.post('/api/login').send(loginUser).expect(200)
        const newBlog = {
            author: 'No-one',
            url: 'www.nowhere.gone',
            user: '616d878257834a67774dfe54'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `bearer ${loggedUser.body.token}`)
            .send(newBlog)
            .expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Deleting or modifying blogposts:', () => {
    test('deleting a post works', async () => {
        const loginUser = {
            username: 'test',
            password: 'administrator'
        }
        const loggedUser = await api.post('/api/login').send(loginUser).expect(200)
        let token = `Bearer ${loggedUser.body.token}`

        const newBlog = {
            author: 'Meh!',
            title: 'About me',
            url: 'nonexistent',
            likes: 22
        }
        await api
            .post('/api/blogs')
            .set("Authorization", token)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[blogsAtStart.length -1]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', token)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).not.toContain(blogToDelete.title)
    })
    test('Deleting without a token does not work', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', "")
            .expect(401)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    } )

    test('updating the likes of a post works', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[2]
        blogToUpdate.likes = blogToUpdate.likes + 100

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[2].likes).toEqual(blogToUpdate.likes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})