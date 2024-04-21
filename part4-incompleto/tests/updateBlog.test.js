const request = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

describe('responds with status 400 if field is missing', () => {
    test('responds with status 400 if title is missing', async () => {
        const newBlogPost = {
            // _id: '5a422aa71b54a676234d17w1',
            // title: "Pizzamazing",
            // author: "Johnny Pepperoni",
            // url: "Pepe.com",
            // likes: 7
        };

        // Realizar la solicitud POST a la URL /api/blogs
        const response = await request(app)
            .post('/api/blogs')
            .send(newBlogPost);

        // Verificar que la solicitud responde con el código de estado 400 Bad Request
        expect(response.status).toBe(400);
    });
});