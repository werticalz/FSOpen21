const { sumBy } = require('lodash')
const lodash = require('lodash')


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
var countBlogsByAuthor = (blogs) => {
    result = {}
    amounts = lodash.countBy(blogs, 'author')
    let highest = lodash.max(lodash.values(amounts))
    lodash.forIn(amounts, function (amount, author) {
        amount === highest
            ? (result.author = author, result.blogs = amount)
            : NaN
    })

    return result
}

var countLikesByAuthor = (blogs) => {
    result = {}
    result = lodash.forIn(blogs, function (value, key) {
        delete value._id
        delete value.title
        delete value.url
        delete value.__v
    })
    result = lodash.groupBy(blogs, 'author')
    result = lodash.reduce(result, function (o, value, key) {
        let e = {}
        e.author = key
        value.length === 1
            ? e.likes = value.likes
            : e.likes = lodash.sumBy(value, 'likes')
        o.push(e)
        return o
    })
    return lodash.maxBy(result, 'likes')
}

var mostBlogs = (blogs) => {
    return blogs.length === 0
        ? "No blogs in the array"
        : countBlogsByAuthor(blogs)
}

var mostLikes = (blogs) => {
    return blogs.length === 0
        ? "No blogs in the array"
        : countLikesByAuthor(blogs)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}