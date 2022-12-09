const User = require('../models/user');
const jwt = require("jsonwebtoken");
const { getUser, createUser } = require('../services/user');

exports.signup = (req, res) => {
    getUser({ email: req.body.email })
        .then(user => {
            if (!user) { return createUser(req.body) }
            else throw ({ message: 'Account already exist with this email' });
        })
        .then(newuser => {
            let token = jwt.sign({ id: newuser._id }, 'opejfdvnsdflksdfoiseflksndflk');
            return res.status(200).send({ message: 'Login Successful!', user: newuser, token })
        })
        .catch(err => res.status(400).send(err))
}

exports.login = (req, res) => {
    getUser({ email: req.body.email })
        .then(user => {
            if (user) {
                if (user.authenticate(req.body.password)) {
                    user.salt = undefined;
                    user.encry_password = undefined;
                    let token = jwt.sign({ id: user._id }, 'opejfdvnsdflksdfoiseflksndflk');
                    return res.status(200).send({ message: 'Login Successful!', user: user, token })
                }
                else throw ({ status: 400, message: 'Invalid email or password' });
            } else return res.status(404).send({ message: 'User not found' })
        })
        .catch(err => res.status(err.status || 400).send({ message: err.message || 'Error logging in', err }));
}