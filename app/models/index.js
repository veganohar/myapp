const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.customer = require("./customer.model");


module.exports = db;