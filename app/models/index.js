const mongoose = require("mongoose");

const db = {};

db.mongoose = mongoose;
db.customer = require("./customer.model");
db.state = require("./states.model");
db.city = require("./city.model");


module.exports = db;