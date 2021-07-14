const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 25
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
        require: true
    },
    points: {
        type: Number,
        default: 500
    }
});

module.exports = mongoose.model('user', userSchema);