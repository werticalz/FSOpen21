const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper_backend')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('Initial blogs', () => {
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

test('posting a new blog works', async () => {
    const newBlog = {
        author: 'Me',
        title: 'About me',
        url: 'nonexistent'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('posting a blog with no like value returns default value, 0', async () => {
    const newBlog = {
        author: 'No-one',
        title: 'No title',
        url: 'www.nowhere.gone'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)

    const response = await api
        .get('/api/blogs')
        .expect(200)

    response.body.forEach(e => {
        expect(e.likes).toBeDefined()
        console.log(e)
        e.title === 'No title'
            ? expect(e.likes).toEqual(0)
            : NaN
    })
})
afterAll(() => {
    mongoose.connection.close()
})