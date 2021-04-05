const mongoose = require("mongoose");

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        name:String,
        father_name:String,
        dob:Date,
        phone:Number,
        email:String,
        gender:String,
        interests:[],
        address:String,
        state:Number,
        city:Number,
        createdOn:{
            type:Date,
            default:Date.now
        }
    })
)

module.exports = Customer;