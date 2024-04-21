const blog = require('../models/blog')
const Note = require('../models/note')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "Pizzamazing2",
        author: "Johnny Pepperoni",
        url: "Pepe.com",
        likes: 7
    },
    {
        title: "Pizzamazing3",
        author: "Johnny Pepperoni",
        url: "Pepe.com",
        likes: 7
    }
]

const nonExistingId = async () => {
    const blog = new blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}


const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, usersInDb
}