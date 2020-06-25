const Fixture = require('../Models/fixture')
const { requestOK, createSuccess, fileNotFound, requestTimedOut, failure, badRequest } = require('../responder/response')
const dotenv = require('dotenv')
dotenv.config()


const createFixture = async (req, res) => {

    let { home_team, away_team, venue, time } = req.body;

    try {

        let createdFixture = await Fixture.create({home_team, away_team, venue , time });

        if (createdFixture) {
           return createSuccess(createdFixture, res)
        }
        return badRequest(res, 'Unable to create fixture')
    }
    catch (err) {
        return failure(res, 'Something went wrong')
    }

}

const viewAllFixtures = async (req, res) => {

    try {
        let allFixtures = await Fixture.find({date_deleted: null});
        if (allFixtures) {
            return requestOK(allFixtures, res)
        }
        return fileNotFound(res, 'Unable to find fixtures')
    }
    catch (err) {
        return failure(res, 'Something went wrong')
    }
}


const viewCompletedFixtures = async (req, res) => {

    try {
        let completedFixtures = await Fixture.find({status: 'completed'});
        if (completedFixtures) {
            return requestOK(completedFixtures, res)
        }
        return fileNotFound(res, 'no completed fixture found')
    }
    catch (err) {
        return failure(res, 'Something went wrong')
    }
}

const viewPendingFixtures = async (req, res) => {
    try {
        let pendingFixtures = await Fixture.find({status: 'pending'});
        if (pendingFixtures) {
            return requestOK(pendingFixtures, res)
        }
        return fileNotFound(res, 'no pending fixture found')
    }
    catch (err) {
        return failure(res, 'Something went wrong')
    }
}

const viewFixture = async (req, res) => {
    let { fixture_id } = req.params;
    try {

        let fixture = await Fixture.findOne({_id: fixture_id});
        if (fixture && fixture.date_deleted === null) {
            return requestOK(fixture, res)
        }
        return fileNotFound(res, 'fixture not found')
    }
    catch(err) {
        return failure(res, 'Something went wrong')
    }

}

const updateFixtureStatus = async (req, res) => {

    let { fixture_id } = req.params;
    let { status, score } = req.body;

    try {

        let update = await Fixture.findOne({_id: fixture_id, status: 'pending'});

        let completeStatus = 'COMPLETED'.toLowerCase();

        if (status !== completeStatus) {
            throw 'match status can either be pending or completed'
        }

        if(update && update.date_deleted === null) {
            update.status = status;
            update.score = score;
            update.save();
            return requestOK(update, res);
        }
        
        throw 'Fixture may have been deleted or completed';
    }

    catch (err) {
        return fileNotFound(res, err)
    }
}


const updateFixture = async (req, res) => {
    let { fixture_id } = req.params;

    try {
        let update = await Fixture.findOneAndUpdate({_id: fixture_id, date_deleted: null}, req.body, {new: true});
        return requestOK(update, res, 'Updated successfully')
    }
    catch (err) {
      return failure(res, 'Unable to update fixture, Something went wrong')
    }
}


const deleteFixture = async (req, res) => {
    let { fixture_id } = req.params;
    
    try {

        let fixture = await Fixture.findOne({_id: fixture_id});
        if(fixture && fixture.date_deleted === null) {
            fixture.date_deleted = Date.now();
            fixture.save();
            return requestOK('Done', res, 'fixture successfully deleted')
        }

        return  fileNotFound(res, 'fixture not found')
    }

    catch (err) {
        return failure(res, 'Something went wrong')
    }
}


module.exports = {

    createFixture, viewAllFixtures, viewFixture, updateFixtureStatus, deleteFixture, updateFixture, viewCompletedFixtures, viewPendingFixtures

}