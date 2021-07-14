const jwt = require('jsonwebtoken')

async function auth(req, res, next) {
    const token = req.headers['authentication'];
    !token && res.status(403).json("User not found")
    try {
        const token = await jwt.verify(token, process.env.JWT_SCERET_KEY);
        req.auth = token;
        next();
    }
    catch (err) {
        res.status(500).json('invalid token')

    }

}
module.exports = auth;