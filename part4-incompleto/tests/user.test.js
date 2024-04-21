const bcrypt = require('bcryptjs')
const User = require('../models/user')
const request = require('supertest');
const app = require('../app');

// const mongoose = require('mongoose')
// mongoose.set("bufferTimeoutMS", 10000)


// describe('when there is initially one user in db', () => {
//     beforeEach(async () => {
//         await User.deleteMany({}, { timeout: 30000 });

//         const passwordHash = await bcrypt.hash('sekret', 10)
//         const user = new User({ username: 'root', passwordHash })

//         await user.save()
//     }, 30000)

//     test('creation succeeds with a fresh username', async () => {
//         const usersAtStart = await helper.usersInDb()

//         const newUser = {
//             username: 'mluukkai',
//             name: 'Matti Luukkainen',
//             password: 'salainen',
//         }

//         await api
//             .post('/api/users')
//             .send(newUser)
//             .expect(201)
//             .expect('Content-Type', /application\/json/)

//         const usersAtEnd = await helper.usersInDb()
//         expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

//         const usernames = usersAtEnd.map(u => u.username)
//         expect(usernames).toContain(newUser.username)
//     }, 30000)
// })

describe('responds with status 400 if field is missing', () => {
    test('responds with status 400 if username is missing', async () => {
        const newUser = {
            // username: '',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        // Realizar la solicitud POST a la URL /api/user
        const response = await request(app)
            .post('/api/users')
            .send(newUser);

        // Verificar que la solicitud responde con el código de estado 400 Bad Request
        expect(response.status).toBe(400);
    });
    test('responds with status 400 if password is missing', async () => {
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            // password: 'salainen',
        }

        // Realizar la solicitud POST a la URL /api/user
        const response = await request(app)
            .post('/api/users')
            .send(newUser);

        // Verificar que la solicitud responde con el código de estado 400 Bad Request
        expect(response.status).toBe(400);
    });

});