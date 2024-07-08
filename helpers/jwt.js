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
        // Is revoked is a function that will check the token(majorly the details in the token and give or revoke permission)
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
            {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users`,
        ]
    });

    async function isRevoked(req, payload, done) {
        if(!payload.isAdmin) {
            done(null, true)
        }
    
        done();
    }
}

module.exports = authJwt;
