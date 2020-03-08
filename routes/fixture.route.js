const express = require('express')
const router = express.Router()
const { 
    createFixture, 
    viewAllFixtures, 
    viewFixture, 
    updateFixtureStatus, 
    updateFixture, 
    deleteFixture 
} = require('../controllers/fixtureController')
const { checkIfTeamsExist, checkMatchStatus } = require('../middlewares/middleware')

const { validateFixtureInput } = require('../validation/validation')



  router.post('/create', validateFixtureInput, checkIfTeamsExist, checkMatchStatus, createFixture);

  router.get('/show', viewAllFixtures);
  
  router.get('/:fixture_id', viewFixture);
   
  router.put('/:fixture_id', validateFixtureInput, updateFixture);
  
  router.put('/status/:fixture_id', updateFixtureStatus);
  
  router.delete('/:fixture_id', deleteFixture)

  module.exports = router;