const mongoose = require('mongoose');
const crypto = require('crypto');
const { v4 } = require('uuid');

const userSchema = new mongoose.Schema({
    avatar: String,
    first_name: {
        type: Object,
        required: true,
    },
    last_name: {
        type: Object,
        required: true,
    },
    email: {
        type: Object,
        required: true,
    },
    encry_password: String,
    device_token: String,
    salt: String,
}, { timestamps: true })

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = v4();
        this.encry_password = this.securePassword(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.encry_password;
    },
    securePassword: function (plainPassword) {
        if (!plainPassword) return '';
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainPassword)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
}

module.exports = mongoose.model('User', userSchema);