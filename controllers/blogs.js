const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, res) => {
    const blogs = await Blog.find({})
    res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, res) => {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
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