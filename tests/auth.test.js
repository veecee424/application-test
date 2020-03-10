const request = require('supertest')
const app = require('../app');
const dotenv = require('dotenv');
dotenv.config()



describe(' AUTH ROUTES', () => {
    test('should throw an error because the username has been taken', async () => {
        const response = await request(app)
        .post('/register')
        .send({
            username: 'Admin',
            password: 123456,
            email: 'admin@yahoo.com'
        })
        expect(response.statusCode).toBe(400)
    })

    test('should log a user in', async () => {
        const response = await request(app)
        .post('/login')
        .send({
            username: 'Admin',
            password: 123456,
        })
        expect(response.statusCode).toBe(200)
    })
})