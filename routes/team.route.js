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
const { verifyToken, isAdmin, checkIfTeamHasBeenCreated } = require('../middlewares/middleware')



router.post('/create', verifyToken, isAdmin, validateTeamInput, checkIfTeamHasBeenCreated, createTeam); 

router.get('/show', viewAllTeams);

router.get('/:team_id', viewTeam);

router.put('/:team_id',verifyToken, isAdmin, validateTeamInput, editTeam);

router.delete('/:team_id', verifyToken, isAdmin, deleteTeam);


module.exports = router;