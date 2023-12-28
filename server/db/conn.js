const mongoose = require("mongoose");

const DB = process.env.DATABASE_URL;

mongoose.connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("database connected")).catch((err) => console.log("errr", err))