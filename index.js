const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors());

app.listen(port, () => {
    console.log("My App is running on Port " + port);
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
    for(let p in obj){
        console.log(obj[p]);
    }

    res.send(req.body);
})

app.post("/dataparams/:name/:age",(req,res)=>{
    console.log(req.params.age);
    let n = parseFloat(req.params.age);
    let o = Number(req.params.age);
    let p = JSON.parse(req.params.age);
    console.log(n);
    console.log(o);
    console.log(p);
    res.send(req.params);
})

app.post("/dataquery",(req,res)=>{
    console.log(req.query);
    res.send(req.query);
})