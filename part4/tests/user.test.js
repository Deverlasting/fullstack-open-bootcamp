const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const helper = require('./test_helper')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    after(async () => {
        // Desconectarse de la base de datos después de las pruebas
        await mongoose.connection.close();
    });

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

})


describe('Error response if invalid user', () => {
    test('responds with status 400 if username is missing', async () => {
        const newUser = {
            // username: '',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        // Realizar la solicitud POST a la URL /api/user
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

    });
    test('responds with status 400 if password is missing', async () => {
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            // password: 'salainen',
        }

        // Realizar la solicitud POST a la URL /api/user
        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)

    });

})

