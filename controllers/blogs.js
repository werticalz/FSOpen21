const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, res) => {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, res) => {
    const b = request.body
    const u = await User.findById(b.user)
    const blog = new Blog({
        title: b.title,
        author: b.author,
        url: b.url,
        user: u._id
    })

    const savedBlog = await blog.save()
    u.blogs = u.blogs.concat(savedBlog._id)
    await u.save({blogs: u.blogs})

    res.json(savedBlog.toJSON())
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
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
})

module.exports = blogsRouter