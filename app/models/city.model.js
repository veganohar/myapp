const mongoose = require("mongoose");

const City = mongoose.model(
    "City",
    new mongoose.Schema({
        name:String,
        createdOn:{
            type:Date,
            default:Date.now
        },
        state:{
            type: mongoose.Schema.Types.ObjectId,
             ref: 'State'
        }
    })
)

module.exports = City;