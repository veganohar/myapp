const db = require("../models");
const City = db.city;

exports.createCity = (req, res) => {
    let city = new City();
    city.name = req.body.name;
    city.state = req.body.state;
    city.save((err, response) => {
        if (err) {
            return res.status(500).send({ message: err })
        }
        res.status(201).send({
            statusCode: 201,
            data: response,
            message: "Record Saved Successfully"
        })
    })

}


exports.getAllCities = (req, res) => {
    City.find().sort("name").populate("state","name").exec((err, cities) => {
        if (err) {
            return res.status(500).send({ message: err })
        }
        res.status(200).send({
            statusCode: 200,
            data: cities
        })
    })
}

exports.getCitiesbyState = (req, res) => {
    City.find({state:req.params.sid}).sort("name").exec((err, cities) => {
        if (err) {
            return res.status(500).send({ message: err })
        }
        res.status(200).send({
            statusCode: 200,
            data: cities
        })
    })
}

exports.updateCity = (req, res) => {
    City.updateOne({ _id: req.body._id }, req.body, (err, response) => {
        if (err) {
            return res.status(500).send({ message: err })
        }
        res.status(201).send({
            statusCode: 201,
            data: response,
            message: "Data Updated Successfully"
        })
    })
}


exports.deleteCity = (req, res) => {
    City.deleteOne({ _id: req.params.cid }, (err, response) => {
        if (err) {
            return res.status(500).send({ message: err })
        }
        res.status(201).send({
            statusCode: 201,
            data: response,
            message: "Data Deleted Successfully"
        })
    })
}