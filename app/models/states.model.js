const mongoose = require("mongoose");

const State = mongoose.model(
    "State",
    new mongoose.Schema({
        name:String,
        createdOn:{
            type:Date,
            default:Date.now
        }
    })
)

module.exports = State;