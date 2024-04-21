const request = require('supertest');
const app = require('../app'); // Suponiendo que tu aplicación Express está en un archivo app.js
const Blog = require('../models/blog');

describe('check field is not empty', () => {
    test('likes property defaults to 0 if missing in request', async () => {
        const newBlogPost = {
            // _id: '5a422aa71b54a676234d17b2',
            title: 'Test likes missing',
            author: 'Missing You babe',
            url: 'test.com',
            __v: 0
        };

        // Realizar la solicitud POST a la URL /api/blogs
        const response = await request(app)
            .post('/api/blogs')
            .send(newBlogPost);

        // Verificar que la solicitud fue exitosa (código de estado 201)
        expect(response.status).toBe(201);

        // Verificar que el número total de blogs en el sistema se incrementa en uno
        const blogsAfterPost = await Blog.find();
        expect(blogsAfterPost.length).toBeGreaterThan(0); //  hay al menos un blog en la base de datos

        // Verificar que la propiedad "likes" tenga el valor 0 por defecto
        const savedBlogPost = blogsAfterPost.find(blog => blog.title === newBlogPost.title);
        expect(savedBlogPost).toBeDefined();
        expect(savedBlogPost.likes).toBe(0);
    });
});


describe('responds with status 400 if field is missing', () => {
    test('responds with status 400 if title is missing', async () => {
        const newBlogPost = {
            // _id: '5a422aa71b54a676234d17w1',
            // title: "Pizzamazing",
            author: "Johnny Pepperoni",
            url: "Pepe.com",
            likes: 7
        };

        // Realizar la solicitud POST a la URL /api/blogs
        const response = await request(app)
            .post('/api/blogs')
            .send(newBlogPost);

        // Verificar que la solicitud responde con el código de estado 400 Bad Request
        expect(response.status).toBe(400);
    });

    test('responds with status 400 if url is missing', async () => {
        const newBlogPost = {
            // _id: '5a422aa71b54a676234d17w1',
            title: "Pizzamazing",
            author: "Johnny Pepperoni",
            // url: "Pepe.com",
            likes: 7
        };

        // Realizar la solicitud POST a la URL /api/blogs
        const response = await request(app)
            .post('/api/blogs')
            .send(newBlogPost);

        // Verificar que la solicitud responde con el código de estado 400 Bad Request
        expect(response.status).toBe(400);
    });
});