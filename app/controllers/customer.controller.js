const db = require("../models");
const Customer = db.customer;

exports.createCustomer = (req,res)=>{
    let obj = req.body;
    let customerData = new Customer();
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

}


exports.getAllCustomers = (req,res)=>{
    Customer.find((err,customers)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(200).send({
            statusCode:200,
            data:customers
        })
    })
}

exports.updateCustomer = (req,res)=>{
    Customer.updateOne({_id:req.body._id},req.body,(err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            statusCode:201,
            data:response,
            message:"Data Updated Successfully"
        })
    })
}


exports.deleteCustomer = (req,res)=>{
    Customer.deleteOne({_id:req.params.cid},(err,response)=>{
        if(err){
            return res.status(500).send({message:err})
        }
        res.status(201).send({
            statusCode:201,
            data:response,
            message:"Data Deleted Successfully"
        })
    })
}