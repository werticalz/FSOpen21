const dummy = require('../utils/list_helper').dummy
const totalLikes = require('../utils/list_helper').totalLikes
const blogs = [
    {
        "title": "Otsikko",
        "author": "Tekijä",
        "url": "osoite",
        "likes": 2
    },
    {
        "title": "Title",
        "author": "Author",
        "url": "URL",
        "likes": 5
    }
]
const blog = [
    {
        "title": "Blog",
        "author": "blogger",
        "url": "website",
        "likes": 3
    }
]


test('Dummy returns one', () => {
    expect(dummy(blogs)).toBe(1)
})



describe('Total likes', () => {
    test('of an empty list returns 0', () => {
        expect(totalLikes([])).toBe(0)
    })

    test('of a list of only one blog to be right', () => {
        expect(totalLikes(blog)).toBe(3)
    })

    test('of a list of multiple blogs', () => {
        expect(totalLikes(blogs)).toBe(7)
    })
})