const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: String,
    password: String,
    displayName: String,
    email: {
        type: String,
        unique: true,
        sparse: true, // Allows null or undefined values for uniqueness check
    },
    image: String
}, { timestamps: true });


const userdb = new mongoose.model("users", userSchema);

module.exports = userdb;