const controller = require("../controllers/ejs.controller");

module.exports = function(app){
    app.get("/testejs", controller.testejs); 
    app.get("/dynamicejs", controller.dynamicejs);
}