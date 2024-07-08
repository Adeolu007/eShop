const expressJwt = require('express-jwt');
require('dotenv').config();

function authJwt() {
  //  const secret = "kjhgfrtyhnm"; // Replace with process.env.secret in production
    const secret = process.env.secret;
    const api = process.env.API_URL;
    if (!secret) {
        throw new Error('Missing JWT secret. Please set the `JWT_SECRET` environment variable.');
    }

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        // isRevoked: isRevoked
    }).unless({
        path: [
            `${api}/users/login`,
            `${api}/users`,
        ]
    });
}

module.exports = authJwt;
