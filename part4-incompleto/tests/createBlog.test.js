const request = require('supertest');
const app = require('../app'); // Suponiendo que tu aplicación Express está en un archivo app.js
const Blog = require('../models/blog');
const mongoose = require('mongoose')

const jwt = require('jsonwebtoken');

afterAll(() => {
    mongoose.connection.close()
})


// describe('POST /api/blogs', () => {
//     test('creates a new blog post', async () => {
//         const newBlogPost = {
//             _id: '5a422aa71b54a676234d17c2',
//             title: 'Test',
//             author: 'Testora Johns',
//             url: 'test.com',
//             likes: 5,
//             __v: 0
//         };

//         // Realizar la solicitud POST a la URL /api/blogs
//         const response = await request(app)
//             .post('/api/blogs')
//             .send(newBlogPost);

//         // Verificar que la solicitud fue exitosa (código de estado 201)
//         expect(response.status).toBe(201);

//         // Verificar que el número total de blogs en el sistema se incrementa en uno
//         const blogsAfterPost = await Blog.find();
//         expect(blogsAfterPost.length).toBeGreaterThan(0); // hay al menos un blog en la base de datos

//         // Verificar que el contenido de la publicación del blog se guarde correctamente en la base de datos
//         const savedBlogPost = blogsAfterPost.find(blog => blog.title === newBlogPost.title);
//         expect(savedBlogPost).toBeDefined();
//         expect(savedBlogPost.content).toBe(newBlogPost.content);
//     });
// });

// Genera un token válido utilizando una clave secreta conocida
const token = jwt.sign({ username: 'Pepperoni83' }, process.env.SECRET);
// const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBlcHBlcm9uaTgzIiwiaWQiOiI2NjE5MTJhNjJjZTU2ZDBlYjgyZGFiMWUiLCJpYXQiOjE3MTMwMTgxOTB9.M3V3RMgjuqa6CsQ9LXZzp9d5UWF1DN_lde8HT0m0qRw`


console.log(token)

describe('POST /api/blogs', () => {
    test('creates a new blog post', async () => {
        const newBlogPost = {
            _id: '661a96c7937001888a386194',
            title: "blog4",
            author: "Johnny Pepperoni",
            url: "sin url",
            likes: 6,
            __v: 0
        };

        // Realizar la solicitud POST a la URL /api/blogs
        const response = await request(app)
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`) // Incluir el token en el encabezado de autorización
            .send(newBlogPost);


        // Verificar que la solicitud fue exitosa (código de estado 201)
        expect(response.status).toBe(201);

        // Verificar que el número total de blogs en el sistema se incrementa en uno
        const blogsAfterPost = await Blog.find();
        expect(blogsAfterPost.length).toBeGreaterThan(0); // hay al menos un blog en la base de datos

        // Verificar que el contenido de la publicación del blog se guarde correctamente en la base de datos
        const savedBlogPost = blogsAfterPost.find(blog => blog.title === newBlogPost.title);
        expect(savedBlogPost).toBeDefined();
        expect(savedBlogPost.content).toBe(newBlogPost.content);
    });
});

