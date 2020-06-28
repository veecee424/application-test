const Team = require('../Models/team')
const { requestOK, createSuccess, fileNotFound, failure, badRequest} = require('../responder/response')

const createTeam = async (req, res) => {
    
    try {

        let createdTeam = await Team.create(req.body);

        if(createdTeam) {
            return createSuccess(createdTeam, res, 'Team successfully created')
        }
        return badRequest(res, 'Unable to create team')

    } 
    catch (err) {
        return failure(res, 'Something went wrong while trying to create team')
    }
}

const viewAllTeams = async (req, res) => {

    try {

      let allTeams = await Team.find({date_deleted: null});
        
        if(allTeams[0] === undefined) {
            return fileNotFound(res, 'team not found')
        }

        return requestOK(allTeams, res)
    }
    catch (err) {
        return failure(res, 'Something went wrong while trying to fetch all teasm')
    }

}

const viewTeam = async (req, res) => {

    try {
        let foundTeam = await Team.findById({_id: req.params.team_id});
        
        if (foundTeam === null || foundTeam.date_deleted !== null) {
            return fileNotFound(res, 'Sorry, team not found.')
        }
        return requestOK(foundTeam, res)
    }
    catch (err) {
        return fileNotFound(res, err)
    }
}

const editTeam = async (req, res) => {

    const providedUpdateFields = Object.keys(req.body)
    const validUpdateFields = ['team_name', 'team_alias']
    const isValid = providedUpdateFields.every((field) => {
        return validUpdateFields.includes(field)
    }) 

    if (!isValid) {
        return badRequest(res, 'Bad update parameter(s)')
    }

    let { team_id } = req.params;

    try {

        let team = await Team.findOneAndUpdate({ _id: team_id}, req.body, {new: true});
        if (team) {
            return requestOK(team, res, 'team info successfully updated')
        }

        return badRequest(res, 'Unable to edit team')

    }
    catch (err) {
        return failure(res, 'Something went wrong while updating team')
    }
}

const deleteTeam = async (req, res) => {
    let { team_id } = req.params;
    
    try {
        let teamToDelete = await Team.findById({ _id: team_id });

    if (teamToDelete === null || teamToDelete.date_deleted !== null) {
        return fileNotFound(res, 'team not found')
    }

    teamToDelete.date_deleted = Date.now();
    await teamToDelete.save();
    return requestOK('Done', res, 'team successfully deleted')

    }
    catch (err) {
        return failure(res, 'Something went wrong')
    }
}


module.exports = {
    createTeam, viewAllTeams, viewTeam, editTeam, deleteTeam
}