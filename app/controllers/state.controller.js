const db = require("../models");
const State = db.state;

exports.createState = (req, res) => {
    let state = new State();
    state.name = req.body.name;
    state.save((err, response) => {
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


exports.getAllStates = (req, res) => {
    State.find().sort("name").exec((err, states) => {
        if (err) {
            return res.status(500).send({ message: err })
        }
        res.status(200).send({
            statusCode: 200,
            data: states
        })
    })
}

exports.updateState = (req, res) => {
    State.updateOne({ _id: req.body._id }, req.body, (err, response) => {
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


exports.deleteState = (req, res) => {
    State.deleteOne({ _id: req.params.sid }, (err, response) => {
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