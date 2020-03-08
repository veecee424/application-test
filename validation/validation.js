const joi = require('@hapi/joi')
const { failure } = require('../responder/response')


const validateTeamInput = async (req, res, next) => {

    try {

        const schema = joi.object().keys({
            team_name: joi.string().trim().required().min(3).messages({
    
                'string.base': 'team name must be a string',
                'string.empty': 'team name is required, cannot be empty',
                'string.min': 'team name cannot be less than 3 characters',
                
            }),
    
            team_alias: joi.string().required().min(3).messages({
    
                'string.base': 'team alias must be a string',
                'string.empty': 'team alias is required, cannot be empty',
                'string.min': 'team alias cannot be less than 3 characters',
            
            })
            
        })
    
       const {error} = await schema.validate(req.body);
    
       if (error) {
    
           let main_error = await error.details;
    
           main_error.forEach(err => {
    
            throw err.message
    
           })
    
       } 
    
           next();

    }
    catch (err) {
        return failure(res, err);
    }

    

}

const validateFixtureInput = (req, res, next) => {

    try {
        const schema = joi.object().keys({
            home_team: joi.string().trim().required().min(3).messages({
    
                'string.base': 'home team must be a string',
                'string.empty': 'home team is required, cannot be empty',
                'string.min': 'home team cannot be less than 3 characters',
                
            }),
    
            away_team: joi.string().required().min(3).messages({
    
                'string.base': 'away team must be a string',
                'string.empty': 'away team is required, cannot be empty',
                'string.min': 'away team cannot be less than 3 characters',
            
            }),
    
            venue: joi.string().required().min(3).messages({
    
                'string.base': 'venue must be a string',
                'string.empty': 'venue is required, cannot be empty',
                'string.min': 'venue cannot be less than 3 characters',
            
            }),
    
            time: joi.string().required().min(3).messages({
    
                'string.base': 'match time must be a string',
                'string.empty': 'match time is required, cannot be empty',
                'string.min': 'match time cannot be less than 3 characters',
            
            }),
            
        })
    
       const {error} = schema.validate(req.body);
    
       if (error) {
    
           let main_error = error.details;
    
           main_error.forEach(err => {
    
              throw err.message
    
           })
    
       } 
    
           next();
    }

    catch(err) {
        return failure(res, err)
    }

}




module.exports = { validateFixtureInput, validateTeamInput}