const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Comment = require('../models/comment')

// //aísla el token del encabezado authorization.
// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//         return authorization.replace('Bearer ', '')
//     }
//     return null
// }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }).populate('comments', { content: 1 })
    // const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body;
    const user = request.user

    // const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' });
    }

    // const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    });

    if (!blog.title || !blog.url) {
        return response.status(400).json({ error: 'Title or url missing' });
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const user = request.user
    const blog = await Blog.findById(id);

    // Verifica si el blog existe
    if (!blog) return response.status(404).json({ error: 'Blog not found' });

    // Verifica si el token existe
    if (!request.token) return response.status(401).json({ error: 'Token missing' });

    // Verifica si el usuario tiene permiso para eliminar el blog
    if (blog.user.toString() !== user.id.toString()) {
        return response.status(403).json({ error: 'You are not authorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(id);
    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const id = request.params.id;
    const blog = await Blog.findById(id);


    if (!blog) return response.status(404).end()

    if (body.likes === null) return response.status(400).json({ error: 'Likes field is empty' });

    const blogUpdated = {
        // id: body.id,
        // title: body.title,
        // author: body.author,
        // url: body.url,
        likes: body.likes
    }

    // if (body.likes === null) return response.status(400).json({ error: 'Likes field is empty' });


    await Blog.findByIdAndUpdate(request.params.id, blogUpdated, { new: true });
    response.status(200).end()
    // response.json(updatedBlog);

});

blogsRouter.post('/:id/comments', async (request, response) => {
    const blogId = request.params.id
    const body = request.body
    const user = request.user

    const blog = await Blog.findById(blogId)
    if (!blog) return response.status(404).json({ error: 'Blog not found' })

    const comment = new Comment({
        content: body.content,
        blog: blog._id,
        // user: user._id
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    response.status(201).json(savedComment)
})

module.exports = blogsRouter

