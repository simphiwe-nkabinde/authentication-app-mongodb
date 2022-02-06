const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const handleErrors = require('../errorHandlers/authErrorHandler')
const dotenv = require('dotenv')
dotenv.config()

const cookieOptions = {
    httpOnly: false, 
    maxAge: 1000 * 60 * 5,
    sameSite: 'none',
    secure: true
}
// create new jwt token for payload
const createToken = (payload) => {
    return jwt.sign(payload, 'w', { expiresIn: '1h'})   // *issue: setting secret to .env.JWT_SECRET == undefined
}

/**
 * saves new user email and password into DB
 * @param {*} req { body.email, body.password }
 * @param {*} res 
 */
module.exports.register = (req, res) => {
    const { email, password } = req.body

    User.create({email, password})
        .then(user => {
            res.status(201).json({user})
        })
        .catch(err => {
            let errors = handleErrors.registration(err);
            res.status(400).json(errors);
        })
}

/**
 * verifies user email and password against DB
 * @param {*} req { body.email, body.password }
 * @param {*} res 
 */
module.exports.login = (req, res) => {
    const { email, password } = req.body

    User.findOne({email})   // first verify email
        .then(user => {
            if (user) {
                let auth = bcrypt.compareSync(password, user.password); //hash input pwd then compare to hashed pwd in DB
                if (auth) {
                    let token =  createToken({user: user._id})
                    res.cookie('jwt', token, cookieOptions)  //set cookies for user's browser
                    res.status(201).json({user: user._id})
                } else  {throw new Error ('password is incorrect')}

            } else { throw new Error('email does not exist')}
        })
        .catch(err => {
            console.log(err);
            let errors = handleErrors.login(err);
            res.status(400).json(errors);
        });
}