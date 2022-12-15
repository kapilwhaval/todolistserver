const User = require('../models/user');
const { encrypt, decrypt } = require('../utils/encry-decry');

exports.getUser = (query) => {
    return User.findOne(query)
        .then(user => {
            if (user) {
                user.first_name = decrypt(user.first_name);
                user.last_name = decrypt(user.last_name);
                user.email = decrypt(user.email);
                return user
            } else return user
        })
        .catch(err => { throw err })
}

exports.createUser = (query) => {
    query.first_name = encrypt(query.first_name);
    query.last_name = encrypt(query.last_name);
    query.email = encrypt(query.email);
    return User.create(query)
        .then(user => {
            if (!user) throw ({ message: 'Error creating user!' });
            else {
                user.first_name = decrypt(user.first_name);
                user.last_name = decrypt(user.last_name);
                user.email = decrypt(user.email);
                user.encry_password = undefined;
                user.salt = undefined;
                return user
            }
        })
        .catch(err => { throw err })
}