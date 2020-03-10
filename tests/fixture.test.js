const request = require('supertest')
const app = require('../app');
const dotenv = require('dotenv');
dotenv.config()

const adminToken = process.env.ADMIN_TOKEN;

describe('fixture routes', () => {

    test('create a fixture', async () => {
        const response = await request(app)
        .post('/fixture/create')
        .set('auth-token', adminToken)
        .send({
            home_team: 'derby county',
            away_team: 'barcelona',
            venue: 'camp nou',
            time: '12pm'
        })
        fixture_id = await response.body.data._id;
        expect(response.statusCode).toBe(201)
        expect(response.body.data).toHaveProperty('_id');
    })
    
    test('show all fixtures', async () => {
        const response = await request(app)
        .get('/fixture/show')
        .set('auth-token', adminToken)
        expect(response.statusCode).toBe(200)
    })

    test('should show all completed fixtures', async () => {
        const response = await request(app)
        .get('/fixture/completed')
        expect(response.statusCode).toBe(200);
    })

    test('should show all completed fixtures', async () => {
        const response = await request(app)
        .get('/fixture/pending')
        expect(response.statusCode).toBe(200);
    })

    test('should show a particular fixture', async () =>{
        const response = await request(app)
        .get(`/fixture/${fixture_id}`)
        expect(response.statusCode).toBe(200)
    })

    test('should edit and update a fixture', async () => {
        const response = await request(app)
        .put(`/fixture/${fixture_id}`)
        .set('auth-token', adminToken)
        .send({
            home_team: 'derby',
            away_team: 'barca',
            venue: 'nou camp',
            time: '2pm'
        })
        expect(response.statusCode).toBe(200)
    })

    test('should edit and update a fixture score and status', async () => {
        const response = await request(app)
        .put(`/fixture/status/${fixture_id}`)
        .set('auth-token', adminToken)
        .send({
            status: 'completed',
            score: '0-3'
        })
        expect(response.statusCode).toBe(200)
    })

    test('should edit and update a fixture', async () => {
        const response = await request(app)
        .del(`/fixture/${fixture_id}`)
        .set('auth-token', adminToken)
        expect(response.statusCode).toBe(200);
    })

})