const jwt = require('jsonwebtoken');

exports.isAuthorized = (req, res, next) => {
    const bearer = req.headers['authorization']
    if (bearer) {
        jwt.verify(bearer.split(' ')[1], 'opejfdvnsdflksdfoiseflksndflk', (err, decoded) => {
            if (err) return res.status(401).send({ message: 'Authorization token is expired or invalid' });
            else {
                req.user_id = decoded.id;
                next();
            }
        })
    } else return res.status(401).send({ message: 'No authorization token was found' });
};