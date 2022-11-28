const User = require('../models/user');

exports.getUser = (query) => {
    return User.findOne(query)
        .then(user => user)
        .catch(err => { throw err })
}

exports.createUser = (query) => {
    return User.create(query)
        .then(user => {
            if (!user) throw ({ message: 'Error creating user!' });
            else return user;
        })
        .catch(err => { throw err })
}