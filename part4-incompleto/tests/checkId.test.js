const mongoose = require('mongoose');
const Blog = require('../models/blog'); // Suponiendo que tengas un modelo Blog definido
const config = require('../utils/config')

describe('Blog posts', () => {
    beforeAll(async () => {
        // Conectarse a la base de datos de prueba (o configurar una conexión a una base de datos en memoria)
        await mongoose.connect(config.MONGODB_URI, {
        });
    });

    afterAll(async () => {
        // Desconectarse de la base de datos después de las pruebas
        await mongoose.connection.close();
    });

    test('have id property instead of _id', async () => {
        // Obtener las publicaciones de blog de la base de datos
        const blogs = await Blog.find();

        // Verificar que cada publicación de blog tiene la propiedad "id" definida
        blogs.forEach(blog => {
            expect(blog.id).toBeDefined();
        });

    });
});
