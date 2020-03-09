const express = require('express')
const router = express.Router()
const { registerUser, loginUser } = require('../controllers/authController');
const { validateRegisterationInput } = require('../validation/validation')




router.post('/register', validateRegisterationInput, registerUser)

router.post('/login', loginUser)



module.exports = router;