
const request = require('supertest')
const app = require('../app');
const dotenv = require('dotenv');
dotenv.config()

const adminToken = process.env.ADMIN_TOKEN;



describe(" team routes ", () => {

    test('should create a new team', async () => {
        const response = await request(app)
        .post('/team/create')
        .set('auth-token', adminToken)
        .send({
            team_name: 'aston villa',
            team_alias: 'villa'
        })
        fixture_id = await response.body.data._id;
        expect(response.statusCode).toBe(201)
    })

    test('should throw an error that team exists', async () => {
        const response = await request(app)
        .post('/team/create')
        .set('auth-token', adminToken)
        .send({
            team_name: 'aston villa',
            team_alias: 'villa'
        })
        expect(response.statusCode).toBe(400)
    })

    test("show all existing teams", async () => {
      const response = await request(app)
      .get("/team/show")
      expect(response.statusCode).toBe(200);
    });

    test('show a particular team', async () => {
        const response = await request(app)
        .get(`/team/${fixture_id}`)
        expect(response.statusCode).toBe(200)
        expect(response.body.data).toHaveProperty('_id');
    });

    test('should edit and update a team', async () => {
        const response = await request(app)
        .put(`/team/${fixture_id}`)
        .set('auth-token', adminToken)
        .send({
            team_name: 'Stoke city',
            team_alias: 'potter'
        })
        expect(response.statusCode).toBe(200)
    })

    test('should delete a team', async () => {
        const response = await request(app)
        .del(`/team/${fixture_id}`)
        .set('auth-token', adminToken)
        expect(response.statusCode).toBe(200)
    })

    
  });

  