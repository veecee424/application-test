const express = require('express')
const router = express.Router()
const { 
    createFixture, 
    viewAllFixtures, 
    viewFixture, 
    updateFixtureStatus, 
    updateFixture, 
    deleteFixture,
    viewCompletedFixtures,
    viewPendingFixtures
} = require('../controllers/fixtureController')
const { checkIfTeamsExist, checkMatchStatus, verifyToken, isAdmin } = require('../middlewares/middleware')

const { validateFixtureInput } = require('../validation/validation')



  router.post('/create', verifyToken, isAdmin, validateFixtureInput, checkIfTeamsExist, checkMatchStatus, createFixture);

  router.get('/show', verifyToken, isAdmin, viewAllFixtures);

  router.get('/completed', viewCompletedFixtures)

  router.get('/pending', viewPendingFixtures)
  
  router.get('/:fixture_id', viewFixture);
   
  router.patch('/:fixture_id', verifyToken, isAdmin, checkIfTeamsExist, updateFixture);
  
  router.put('/status/:fixture_id', verifyToken, isAdmin, updateFixtureStatus);
  
  router.delete('/:fixture_id', verifyToken, isAdmin, deleteFixture)

  module.exports = router;