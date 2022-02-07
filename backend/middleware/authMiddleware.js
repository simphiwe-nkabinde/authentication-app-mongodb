const jwt = require('jsonwebtoken')


/**
 * verifies user's jwt token stored in browser cookies
 * @param {*} req { cookies.jwt }
 * @param {*} res { status(), json() }
 * @param {*} next next()
 * @returns 
 */
module.exports.requireAuth = (req, res, next) => {
    let token = req.cookies.jwt
    console.log(req.cookies);
    if (token) {
        jwt.verify(token, 'w', { expiresIn: '1h' })
        if (decoded) {
            console.log('token decoded: ', decoded);
            next()
        } else {
            return res.status(401).json({error: 'token invalid. Please Login'})
        }
    }
    else {
        res.status(401).json({error: 'token not found. Please Login'})
    }
}