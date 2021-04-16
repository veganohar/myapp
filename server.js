const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const dbconfig = require("./app/config/db.config");
const db = require("./app/models");
const fs = require("fs");


if (!fs.existsSync("reports")) {
    fs.mkdirSync("reports");
}

app.use(express.static("reports"));
app.use(cors());
app.use(express.static('views/js'));

app.listen(port, () => {
    console.log("My App is running on Port " + port);
})

db.mongoose.connect(`mongodb://${dbconfig.HOST}:${dbconfig.PORT}/${dbconfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    try {
        console.log("Database Connection Established Successfully");
    } catch (err) {
        console.log(err);
    }
})

app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.send("Hello Node Js");
})


require("./app/routes/customer.routes")(app);
require("./app/routes/ejs.routes")(app);
require("./app/routes/states.routes")(app);
require("./app/routes/cities.routes")(app);