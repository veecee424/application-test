const Team = require('../Models/team')
const { requestOK, createSuccess, fileNotFound } = require('../responder/response')
const { failure } = require('../responder/response')

const createTeam = async (req, res) => {
    
    let { team_name, team_alias } = req.body;
    
    try {

        let createdTeam = await Team.create({team_name, team_alias});

        if(createdTeam) {
            return createSuccess(createdTeam, res, 'Team successfully created')
        }
        throw 'Something went wrong'

    } 
    catch (err) {
        return failure(res, err)

    }  
}

const viewAllTeams = async (req, res) => {

    try {

      let allTeams = await Team.find({date_deleted: null});
        
        if(allTeams[0] === undefined) {
            throw 'team not found'
        }

        return requestOK(allTeams, res)
    }
    catch (err) {
        return fileNotFound(res, err)
    }

}

const viewTeam = async (req, res) => {
    let { team_id } = req.params;

    try {
        let foundTeam = await Team.findById({_id: team_id});
        
        if (foundTeam === null || foundTeam.date_deleted !== null) {
            throw 'Sorry, team not found.'
        }
        return requestOK(foundTeam, res)
    }
    catch (err) {
        return fileNotFound(res, err)
    }
}

const editTeam = async (req, res) => {

    let { team_id } = req.params;

    let { team_name, team_alias } = req.body;

    try {

        let team = await Team.findOne({ _id: team_id});
        if (team !== null || team.date_deleted === null) {
            team.team_name = team_name;
            team.team_alias = team_alias;
            team.save()
            return requestOK(team, res, 'team info successfully updated')
        }

        throw 'team not found'

    }
    catch (err) {
        return fileNotFound(res, err)
    }
}

const deleteTeam = async (req, res) => {
    let { team_id } = req.params;
    
    try {
        let teamToDelete = await Team.findById({ _id: team_id });

    if (teamToDelete === null || teamToDelete.date_deleted !== null) {
        throw 'team not found'
    }

    teamToDelete.date_deleted = Date.now();
    teamToDelete.save();
    return requestOK('Done', res, 'team successfully deleted')

    }
    catch (err) {
        return fileNotFound(res, err)
    }
}


module.exports = {
    createTeam, viewAllTeams, viewTeam, editTeam, deleteTeam
}