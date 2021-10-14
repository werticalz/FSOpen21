const blog = require("../models/blog")

var dummy = (blogs) => {
    return 1
}

var totalLikes = (blogs) => {

    return blogs.length === 0
        ? 0
        : blogs.reduce((sum, blog) => {
            return sum + blog.likes
        }, 0)
}

var favoriteBlog = (blogs) => {
    return blogs.length === 0
    ? "No blogs in the array"
    : blogs.reduce((best, blog) => {
        return best.likes > blog.likes ? best : blog
    }, {})
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}