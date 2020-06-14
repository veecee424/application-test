const User = require('../Models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { failure } = require('../responder/response')
const dotenv = require('dotenv')
dotenv.config()




 const registerUser = async (req, res) => {

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt);

    try {

       let existingUsername = await User.findOne({username: req.body.username});
       if(existingUsername) {
           throw 'username has been taken'
       }

       let existingEmail = await User.findOne({email: req.body.email});
       if(existingEmail) {
        throw 'email is already in use'
       }


       const user = new User({
        username: req.body.username,
        password: hashedPassword,
        email: req.body.email
    })


        const createdUser = await user.save();
        if(createdUser) {
           return res.send(createdUser)
        }
        throw 'Sorry, could not create new user'
    }

    catch(err) {
        return failure(res, err)
    }
    
}

const loginUser = async (req, res) => {

    const { username, password } = req.body;

    try {
        
        const user = await User.findOne({username: username});

        if (!user) {
            throw 'sorry, username does not exist'
        }

        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword) {
            throw 'invalid password'
        }
        
        const token = jwt.sign({user}, process.env.JWT_SECRET);
        return res.header('auth-token', token).json(token)
    }

    catch(err) {
       return res.send(err)
    }
 

}

module.exports = { registerUser, loginUser }