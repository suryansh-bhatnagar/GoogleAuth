const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseTitle: String,
    courseDuration: String
}, { timestamps: true });


const coursedb = new mongoose.model("course", courseSchema);

module.exports = coursedb;