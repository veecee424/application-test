
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const teamRoute = require('./routes/team.route')
const fixtureRoute = require('./routes/fixture.route')

// Database connection
mongoose.connect("mongodb://localhost:27017/assessment", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())




app.use('/team', teamRoute)
app.use('/fixture', fixtureRoute)


// app.get('*', (req, res) =>{
    
// })


app.listen(3000, () => {
    console.log("Running on 3k")
})


