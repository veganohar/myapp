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
        createdOn:{
            type:Date,
            default:Date.now
        },
        city:{
            type: mongoose.Schema.Types.ObjectId,
             ref: 'City'
        }
    })
)

module.exports = Customer;