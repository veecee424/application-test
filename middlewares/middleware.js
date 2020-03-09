const Team = require('../Models/team')
const Fixture = require('../Models/fixture')
const jwt = require('jsonwebtoken')


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
        return res.json(err)
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
        return res.json(err)
    }

}

const verifyToken  = async (req, res, next) => {
    

    try {

        const token = await req.header('auth-token');
    
    if(token) {
        const verified = await jwt.verify(token, 'jwtsecret')
        req.user = verified;
        return next()
    }

        throw 'access denied'
        
    }
    catch(err) {
        return res.json(err)
    }
    
}

const isAdmin  = async (req, res, next) => {
    

    try {

        const token = await req.header('auth-token');
    
    if(token) {
        const verified = await jwt.verify(token, 'jwtsecret') // retrieves the token and coverts it into the payload
        req.user = verified;
        if(req.user.user.is_admin == true) {
          return next()
        }
        throw 'Unauthorized access, you are not an admin'
    }

        throw 'access denied, invalid token'
        
    }
    catch(err) {
        return res.json(err)
    }
    
}



module.exports = {
    checkIfTeamsExist, checkMatchStatus, verifyToken, isAdmin
}