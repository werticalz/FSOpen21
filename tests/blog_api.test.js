const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
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


describe('Posting tests:', () => {
    test('posting a new blog works', async () => {
        const newBlog = {
            author: 'Me',
            title: 'About me',
            url: 'nonexistent'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('posting a blog with no likes value returns default value, 0', async () => {
        const newBlog = {
            author: 'No-one',
            title: 'No title',
            url: 'www.nowhere.gone'
        }

        await api
            .post('/api/blogs')
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
        const newBlog = {
            author: 'No-one',
            url: 'www.nowhere.gone'
        }

        await api.post('/api/blogs').send(newBlog).expect(400)
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

describe('Deleting or modifying blogposts:', () => {
    test('deleting a post works', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    })

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
