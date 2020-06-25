const Team = require('../Models/team')
const Fixture = require('../Models/fixture')
const jwt = require('jsonwebtoken')
const { failure, badRequest } = require('../responder/response')
const dotenv = require('dotenv')
dotenv.config()


const checkIfTeamsExist = async (req, res, next) => {

    let { home_team, away_team } = req.body;

    try {

        let homeTeam = await Team.findOne({team_name: home_team});

        let awayTeam = await Team.findOne({team_name: away_team});
        
        if (homeTeam === null || homeTeam.date_deleted !== null) {
          
            throw 'home team does not exist in list of teams'
        }

        if (awayTeam === null || awayTeam.date_deleted !== null) {

            throw 'away team does not exist in list of teams'
        }
        
        next()
    }
    catch (err) {
        return failure(res, err)
    }
    
};

const checkMatchStatus = async (req, res, next) => {

    let { home_team, away_team } = req.body;


    try {

        let homeTeam = await Fixture.findOne({home_team: home_team})
        let awayTeam = await Fixture.findOne({away_team: away_team});
        
        if (homeTeam !== null && homeTeam.status === 'pending') {
                throw 'home team has a pending match'
        }

        if (awayTeam !== null && awayTeam.status === 'pending') {
                throw 'away team has a pending match'
        }
        next();
    }
    catch (err) {
        return failure(res, err)
    }

}

const verifyToken  = async (req, res, next) => {
    

    try {

        const token = await req.header('auth-token');
    
    if(token) {
        const verified = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        return next()
    }

        throw 'access denied'
        
    }
    catch(err) {
        return failure(res, err)
    }
    
}

const isAdmin  = async (req, res, next) => {
    

    try {

        const token = await req.header('auth-token'); 
    
    if(token) {
        const verified = await jwt.verify(token, process.env.JWT_SECRET) // retrieves the token and coverts it into the payload
        req.user = verified;
        if(req.user.user.is_admin == true) {
          return next()
        }
        return badRequest(res, 'Unauthorized access, you are not an admin')
    }

        throw 'access denied, invalid token'
        
    }
    catch(err) {
        return failure(res, 'Something went wrong')
    }
    
}

const checkIfTeamHasBeenCreated = async (req, res, next) => {
    let { team_name } = req.body;

    try {
        const existingTeam = await Team.findOne({team_name: team_name});
        if(existingTeam && existingTeam.date_deleted === null) {
            throw 'team already exists'
        }
        return next();

    }
    catch (err) {
        return failure(res, err)
    }
}



module.exports = {
    checkIfTeamsExist, checkMatchStatus, verifyToken, isAdmin, checkIfTeamHasBeenCreated
}