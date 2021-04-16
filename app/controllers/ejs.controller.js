const db = require("../models");
const Customer = db.customer;

exports.testejs = (req, res) => {
    res.render("pages/test");
}


exports.dynamicejs = (req, res) => {


    Customer.find((err, customers) => {
        if (err) {
            return res.status(500).send({ message: err })
        }
        let data = {
            heading: "Test Dynamic Ejs",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In ac congue risus. Quisque auctor nibh vitae sapien ultrices, id tempus erat tempor. In hac habitasse platea dictumst. Mauris libero dolor, placerat sed consectetur eu, fermentum eu dui. Morbi tempor, enim sed convallis euismod, nisi diam suscipit quam, in maximus risus odio eget mauris. Curabitur vel porttitor nisi, eget elementum nibh. Mauris est dui, pellentesque quis maximus nec, pretium ac metus. Pellentesque sagittis mollis lorem. Vivamus efficitur mi sit amet magna eleifend, in vehicula diam vulputate.",
            customers:customers
        }
        res.render("pages/dynamic", data);
    })


}

exports.form = (req,res)=>{
    res.render("pages/form");
}