const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(blogs)
});

blogRouter.get('/:id', (request, response) => {
    const id = (request.params.id)
    Blog.findById(id)
        .then(result => {
            response.json(result)
        }).catch(error => {

            // response.status(404).end()
            console.log(error)
            response.send(`The blog with the id ${id} does not exists. <br> Error: ${error}`)
        }
        )
})


blogRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    if (!user || !user._id) {
        return response.status(401).json({ error: 'User not authenticated' })
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})


blogRouter.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const user = request.user; // Obtener el usuario del objeto request

        // Si el usuario no está autenticado, devolver un error de autenticación
        if (!user || !user._id) {
            return response.status(401).json({ error: 'User not authenticated' });
        }

        // Buscar el blog por su ID
        const blog = await Blog.findById(id);

        // Si el blog no existe, devolver un error de recurso no encontrado
        if (!blog) {
            return response.status(404).json({ error: 'Blog not found' });
        }

        // Verificar si el usuario actual es el creador del blog
        if (blog.user.toString() !== user._id.toString()) {
            return response.status(403).json({ error: 'Unauthorized: You are not allowed to delete this blog' });
        }

        // Si el usuario es el creador del blog, eliminarlo
        await Blog.findByIdAndDelete(id);

        response.status(204).end();
    } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Internal server error' });
    }
});


blogRouter.put('/:id', async (request, response, next) => {
    try {
        const body = request.body

        const blog = {
            // id: body.id,
            // title: body.title,
            // author: body.author,
            // url: body.url,
            likes: body.likes
        }

        if (body.likes === null) {
            return response.status(400).json({ error: 'Likes field is empty' });
        } else {
            const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true, context: 'query' });

            response.json(updatedBlog);
        }
    } catch (error) {
        // response.status(400).json({ error: 'Likes field is empty' })
        next(error);
    }
});

module.exports = blogRouter