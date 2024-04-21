const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe("Total likes", () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: "Pizzamazing",
            author: "Johnny Pepperoni",
            url: "pizza.com",
            likes: 7,
            __v: 0
        }
    ]

    const emptyList = []

    const blogsList = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: "Pizzamazing",
            author: "Johnny Pepperoni",
            url: "pizza.com",
            likes: 7,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f9',
            title: "Bocadillo en la playa",
            author: "Angela",
            url: "bocaplaya.com",
            likes: 9,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f6',
            title: "Sandwich mixto",
            author: "Angela",
            url: "trancheteando.com",
            likes: 2,
            __v: 0
        }
    ]
    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 7)
    })

    test('when list is empty, likes are 0', () => {
        const result = listHelper.totalLikes(emptyList)
        assert.strictEqual(result, 0)
    })

    test('when list has more than 1 blog, likes are the sum of all', () => {
        const result = listHelper.totalLikes(blogsList)
        assert.strictEqual(result, 18)
    })

    test('The favorite blog is the one with more likes', () => {
        const result = listHelper.favouriteBlog(blogsList)
        assert.deepStrictEqual(result,
            {
                title: "Bocadillo en la playa",
                author: "Angela",
                likes: 9
            })
    })

    test('The autor with more blogs', () => {
        const result = listHelper.mostBlogs(blogsList)
        assert.deepStrictEqual(result,
            {
                author: "Angela",
                blogs: 2
            })
    })

    test('The autor with more likes', () => {
        const result = listHelper.mostLikes(blogsList)
        assert.deepStrictEqual(result,
            {
                author: "Angela",
                likes: 11
            })
    })
})