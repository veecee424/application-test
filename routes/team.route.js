const express = require('express')
const router = express.Router()
const { 
    createTeam, 
    viewAllTeams, 
    viewTeam, 
    editTeam, 
    deleteTeam 
} = require('../controllers/teamController')

const { validateTeamInput } = require('../validation/validation')



router.post('/create', validateTeamInput, createTeam); 

router.get('/show', viewAllTeams);

router.get('/:team_id', viewTeam);

router.put('/:team_id', validateTeamInput, editTeam);

router.delete('/:team_id', deleteTeam);


module.exports = router;