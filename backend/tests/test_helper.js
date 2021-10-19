const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
    {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 127,
        __v: 0
    },
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 4415,
        user: '616d878257834a67774dfe54',
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 1232,
        user: '616d878257834a67774dfe54',
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 1420,
        user: '616d878257834a67774dfe55',
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 999,
        user: '616d878257834a67774dfe55',
        __v: 0
    }
]

const initialUsers = [
    {
        _id: '616d878257834a67774dfe54',
        username: 'EWDijkstra',
        name: 'Edsger W. Dijkstra',
        passwordHash: '$2b$10$7cpVAYRLyrHKDztFzADJCOp.jFfLn922FWNZzdVHBBegQUkdpjVMu',
        blogs: ['5a422aa71b54a676234d17f8', '5a422b3a1b54a676234d17f9'],
        __v: 0
    }, {
        _id: '616d878257834a67774dfe55',
        username: 'RCMartin',
        passwordHash: '$2b$10$Yaxy3FzIVTq5l9bgz6z6luwxLvOzHoBgwqKc1yJ5y3c2Qd8sFIeeG',
        name: "Robert C. Martin",
        blogs: ['5a422ba71b54a676234d17fb', '5a422b891b54a676234d17fa'],
        __v: 0
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb,
    usersInDb,
    initialUsers,
}