
//set up the server
var express = require("express");
var cors = require("cors");
var app = express();
var fs = require("fs");
var bodyParser = require("body-parser");

//intialize server
app.use(cors());
app.use(bodyParser.json());
const port = "8080";
const host = "localhost";

const account = require("./routes/account");
const sell = require("./routes/sell");

app.use("/", account);
app.use("/", sell);


app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});