const controller = require("../controllers/state.controller");

module.exports = function(app){

    app.post("/api/states/createState", controller.createState);
    app.get("/api/states/getAllStates", controller.getAllStates);
    app.put("/api/states/updateState", controller.updateState);
    app.delete("/api/states/deleteState/:sid", controller.deleteState);
}