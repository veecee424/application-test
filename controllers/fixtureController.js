const Fixture = require('../Models/fixture')
const { requestOK, createSuccess, fileNotFound, requestTimedOut } = require('../responder/response')




const createFixture = async (req, res) => {

    let { home_team, away_team, venue, time } = req.body;

    try {

        let createdFixture = await Fixture.create({home_team, away_team, venue , time });

        if (createdFixture) {
           return createSuccess(createdFixture, res)
        }
        throw 'something went wrong'
    }
    catch (err) {
        return requestTimedOut(res, err)
    }

}

const viewAllFixtures = async (req, res) => {

    try {
        let allFixtures = await Fixture.find({date_deleted: null});
        if (allFixtures) {
            return requestOK(allFixtures, res)
        }
        throw 'no fixture found'
    }
    catch (err) {
        return fileNotFound(res, err)
    }

}


const viewCompletedFixtures = async (req, res) => {

    try {
        let completedFixtures = await Fixture.find({status: 'completed'});
        if (completedFixtures) {
            return requestOK(completedFixtures, res)
        }
        throw 'no completed fixture found'
    }
    catch (err) {
        console.log(completedFixtures)
        return fileNotFound(res, err)
    }

}

const viewPendingFixtures = async (req, res) => {

    try {
        let pendingFixtures = await Fixture.find({status: 'pending'});
        if (pendingFixtures) {
            return requestOK(pendingFixtures, res)
        }
        throw 'no pending fixture found'
    }
    catch (err) {
        return fileNotFound(res, err)
    }

}


const viewFixture = async (req, res) => {
    let { fixture_id } = req.params;

    try {

        let fixture = await Fixture.findOne({_id: fixture_id});
        if (fixture && fixture.date_deleted === null) {
            return requestOK(fixture, res)
        }
        throw 'no fixture found'

    }
    catch(err) {
        return fileNotFound(res, err)
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
    let { home_team, away_team, venue, time } = req.body;

    try {
        let update = await Fixture.findOne({_id: fixture_id, date_deleted: null});
        if(update && update.date_deleted === null) {
            update.home_team = home_team;
            update.away_team = away_team;
            update.venue = venue;
            update.time = time;
            update.save();
            return requestOK(update, res)
        }
        
        throw 'Fixture not found'
    }

    catch (err) {
        return fileNotFound(res, err)
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

        throw 'fixture not found'
    }

    catch (err) {
        return fileNotFound(res, err)
    }
}


module.exports = {

    createFixture, viewAllFixtures, viewFixture, updateFixtureStatus, deleteFixture, updateFixture, viewCompletedFixtures, viewPendingFixtures

}