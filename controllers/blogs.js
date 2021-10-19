const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, res) => {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, res) => {
    const blog = new Blog(request.body)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return res.status(401).json({ error: 'Token missing or invalid' })
    }

    const u = await User.findById(decodedToken.id)
    blog.user = u._id


    const savedBlog = await blog.save()
    u.blogs = u.blogs.concat(savedBlog._id)
    await u.save({ blogs: u.blogs })

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

blogsRouter.delete('/:id', async (req, res) => {
    const blogToRemove = await Blog.findById(req.params.id)
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
        return res.status(401).json({ error: 'Token missing or invalid' })
    }
    if (blogToRemove.user.toString() !== decodedToken.id) {
        return res.status(401).json({ error: 'You are not authorized to delete this blogpost' })
    }

    const removedBlog = await Blog.findByIdAndRemove(req.params.id)
    !removedBlog
        ? res.status(404).json({error: 'Blog not found'}).end()
        : res.status(204).end()
})

module.exports = blogsRouter