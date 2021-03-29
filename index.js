const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');


app.use(cors());

app.listen(port, () => {
    console.log("My App is running on Port " + port);
})

mongoose.connect('mongodb://localhost/myapp_sample', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    try{
        console.log("Database Connection Established Successfully");
    }catch(err){
        console.log(err);
    }
})

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello Node Js");
})

app.post("/databody", (req, res) => {
    console.log(req.body.email);
    var a = [1, 32, "Manohar", "Hyderabad", true];
    // for (let i = 0; i < a.length; i++) {
    //     console.log(a[i]);
    // }
    // for(let e of a){
    //     console.log(e);        
    // }
    let obj = req.body;
    for (let p in obj) {
        console.log(obj[p]);
    }

    res.send(req.body);
})

app.post("/dataparams/:name/:age", (req, res) => {
    console.log(req.params.age);
    let n = parseFloat(req.params.age);
    let o = Number(req.params.age);
    let p = JSON.parse(req.params.age);
    console.log(n);
    console.log(o);
    console.log(p);
    res.send(req.params);
})

app.post("/dataquery", (req, res) => {
    console.log(req.query);
    res.send(req.query);
})

const Schema = mongoose.Schema;

const Customer = new Schema({
    name:String,
    father_name:String,
    dob:Date,
    age:Number,
    phone:Number,
    email:String,
    gender:String,
    interests:[],
    address:String,
    state:String,
    city:String,
    createdOn:{
        type:Date,
        default:Date.now
    }
});

const customer = mongoose.model('customers',Customer);

app.post("/saveData",(req,res)=>{
    let obj = req.body;
    let customerData = new customer();
    for(let p in obj){
        customerData[p] = obj[p];
    }
    customerData.save((err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            statusCode:201,
            data:response,
            message:"Record Saved Successfully"
        })
    })

})

app.get("/getData",(req,res)=>{
    customer.find((err,customers)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(200).send({
            statusCode:200,
            data:customers
        })
    })
})

app.put("/updateData",(req,res)=>{
    customer.updateOne({_id:req.body._id},req.body,(err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            statusCode:201,
            data:response,
            message:"Data Updated Successfully"
        })
    })
})

app.delete("/deleteData/:cid",(req,res)=>{
    customer.deleteOne({_id:req.params.cid},(err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            statusCode:201,
            data:response,
            message:"Data Deleted Successfully"
        })
    })
})