
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


//connect to mongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "secoms319";
const { MongoClient } = require("mongodb");
const client = new MongoClient(url);
const db = client.db(dbName);


app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});

