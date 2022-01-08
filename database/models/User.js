const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    permission: {
        type: Number,
        default: 1,
        required: true
    },
    createDate: {
        type: String,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', UserSchema);
