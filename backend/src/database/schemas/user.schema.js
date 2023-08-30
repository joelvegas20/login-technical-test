// Third Party Imports.
const mongoose = require("mongoose");

// User Schema.
const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// Exports.
module.exports = mongoose.model("user", UserSchema);