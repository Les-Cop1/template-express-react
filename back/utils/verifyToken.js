const jwt = require('jsonwebtoken')

const verifyJWT = async (req, res, next) => {
    const token = req.cookies['auth-token']

    if (!token) {
        return res.status(401).send({success: false, error: 'Access denied'})
    }

    try {
        req.user =  jwt.verify(token, process.env.JWT_SECRET)

        next()
    } catch (err) {
        return res.status(400).send({success: false, error: 'Invalid token'})
    }
}

module.exports = verifyJWT
