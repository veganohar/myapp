const controller = require("../controllers/customer.controller");

module.exports = function(app){

    app.post("/api/customers/createCustomer", controller.createCustomer);
    app.get("/api/customers/getAllCustomers", controller.getAllCustomers);
    app.put("/api/customers/updateCustomer", controller.updateCustomer);
    app.delete("/api/customers/deleteCustomer/:cid", controller.deleteCustomer);
}