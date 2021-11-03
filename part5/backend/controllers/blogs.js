const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, res) => {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', middleware.userExtractor, async (request, res) => {
    if (!request.user) {
        return res.status(401).json({ error: 'Invalid token' })
    }
    const blog = new Blog(request.body)
    blog.user = request.user

    const savedBlog = await blog.save()
    blog.user.blogs = blog.user.blogs.concat(savedBlog._id)
    await blog.user.save()

    res.status(200).json(savedBlog.toJSON())
})

blogsRouter.put('/:id', async (req, res) => {
    const b = req.body
    const id = { _id: req.params.id }
    const blog = {
        title: b.title,
        author: b.author,
        likes: b.likes
    }

    await Blog.findOneAndUpdate(id, blog, { new: true })
    res.status(200).end()
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
    const blogToRemove = await Blog.findById(req.params.id)

    if (blogToRemove.user.toString() !== req.user.id) {
        return res.status(401).json({ error: 'You are not authorized to delete this blogpost' })
    }

    const removedBlog = await Blog.findByIdAndRemove(req.params.id)
    !removedBlog
        ? res.status(404).json({ error: 'Blog not found' }).end()
        : res.status(204).end()
})

module.exports = blogsRouter