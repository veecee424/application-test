
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const teamRoute = require('./routes/team.route')
const fixtureRoute = require('./routes/fixture.route')
const authRoute = require('./routes/auth.route')
const dotenv = require('dotenv');
dotenv.config()



// Database connection
mongoose.connect(process.env.DATABASE_URI || process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.json())


app.use('/team', teamRoute)
app.use('/fixture', fixtureRoute)
app.use(authRoute)

app.get('/', (req, res) => {
    res.send('Welcome to my API')
})


module.exports = app;





