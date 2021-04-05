const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const dbconfig = require("./app/config/db.config");
const db = require("./app/models");

app.use(cors());

app.listen(port, () => {
    console.log("My App is running on Port " + port);
})

db.mongoose.connect(`mongodb://${dbconfig.HOST}:${dbconfig.PORT}/${dbconfig.DB}`, {
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


require("./app/routes/customer.routes")(app);