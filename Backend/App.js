
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
const dbName = "phones";
const { MongoClient } = require("mongodb");
const client = new MongoClient(url);
const db = client.db(dbName);


app.listen(port, () => {
    console.log("App listening at http://%s:%s", host, port);
});



//Post request to sign up
app.post("/signup", async (req, res) =>{
    await client.connect();
    console.log("Node connected successfully to POST MongoDB");

    const user = req.body;

    try{
        const newuser = await db.collection("phones").insertOne(user);
        console.log("User signed up: ", newuser);
        res.status(200);
        res.send("User signed up!");

    }
    catch(e){
        res.status(500);
        res.send("Error sending to MongoDB");
    }

    res.status(200);
});


//Get request to sign up
app.get("/login", async(req, res) => {
    
});

