const jwt = require('jsonwebtoken');

const generateToken = (id, secretKey, expiresTime) => {
    return jwt.sign({ id }, secretKey, {
        expiresIn: expiresTime,
    });
}

module.exports = { generateToken }