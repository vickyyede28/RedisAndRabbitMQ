const mongoose = require("mongoose");

let url = "mongodb://localhost:27017/vicky"

module.exports = (() => {
    mongoose.connect(url);
})