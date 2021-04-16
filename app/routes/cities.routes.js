const controller = require("../controllers/city.controller");

module.exports = function(app){

    app.post("/api/cities/createCity", controller.createCity);
    app.get("/api/cities/getAllCities", controller.getAllCities);
    app.get("/api/cities/getCitiesbyState/:sid", controller.getCitiesbyState);
    app.put("/api/cities/updateCity", controller.updateCity);
    app.delete("/api/cities/deleteCity/:cid", controller.deleteCity);
}