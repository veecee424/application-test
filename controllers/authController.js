const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { failure, requestOK, badRequest } = require('../responder/response')
const dotenv = require('dotenv')
dotenv.config()




 const registerUser = async (req, res) => {

    try {

       let existingUsername = await User.findOne({username: req.body.username});
       if(existingUsername) {
           return badRequest(res, 'username has been taken')
       }

       let existingEmail = await User.findOne({email: req.body.email});
       if(existingEmail) {
        return badRequest(res, 'email is already in use')
       }


       const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })


        const createdUser = await user.save();
        if(createdUser) {
           return res.send(createdUser)
        }
        return badRequest(res, 'Unable to create new user')
    }

    catch(err) {
        return failure(res, 'Sorry, something went wrong while we tried to create user')
    }
    
}

const loginUser = async (req, res) => {

    const { username, password } = req.body;

    try {
        
        const user = await User.findOne({username: username});

        if (!user) {
            return badRequest(res, 'sorry, username does not exist')
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword) {
            return badRequest(res, 'invalid password')
        }
        
        const token = await jwt.sign({'_id': user._id}, process.env.JWT_SECRET);
        return requestOK(token, res)
    }

    catch(err) {
       return failure(res, 'Something went wrong while trying to log in user')
    }
 

}

module.exports = { registerUser, loginUser }