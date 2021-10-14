const dummy = require('../utils/list_helper').dummy

describe('Dummy', () => {
    const blogs = []
    test('should be one', () => {
        expect(dummy(blogs)).toBe(1)
    })
})
