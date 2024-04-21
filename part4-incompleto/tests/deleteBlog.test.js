const request = require('supertest');
const app = require('../app');
const Blog = require('../models/blog');

describe('delete a existing blog', () => {
    test('delete a existing blog', async () => {

        const id = "5a422aa71b54a676234d17b2"
        const response = await request(app).delete(`/api/blogs/${id}`).expect(204);

        const deletedBlog = await Blog.findById(id);
        expect(deletedBlog).toBeNull();
    });

    test('return 404 if blog does not exist', async () => {
        const invalidId = 'invalid-id';

        await request(app).delete(`/api/blogs/${invalidId}`).expect(404);
    });
});
