
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

        const exist = await db.collection("phones").findOne({Email: user.Email});

        if(exist){
            res.status(400);
            res.send("Email is already in use");
        }
        
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
app.post("/login", async(req, res) => {
    await client.connect();
    console.log("Connected with MongoDB");

    const user = req.body;

    try{
        const check = await db.collection("phones").findOne({Email: user.Email});

        if(!check){
            res.status(400);
            res.send("Email does not exist");
        }
        else{
            if(check.Password === user.password){
                res.status(200);
                res.send(check);
            }
            else{
                res.status(401);
                res.send("Incorrect password");
            }
        }
    }
    catch{
        res.status(500);
        res.send("Could not send to mongoDB");
    }
});


//updating what the person is selling
app.put("/sell", async(req, res) =>{
    await client.connect();
    console.log("Connected with MongoDB");

    const form = req.body;
    const data = JSON.parse(fs.readFileSync("./phone.json")); //Save the phone data as json object

    let id = data.products[data.products.length-1].id + 1; //get a new unique id for the sell product
    data.products.push(form); //submit the infromation to the json
    form.id = id;

    console.log(id);

    fs.writeFileSync("./phone.json", JSON.stringify(data)); //write back to the file

    try{
        const check = await db.collection("phones").findOne({Email: form.email});
        console.log(check);
        check.sell.push(id);

        const update = {
            $set: check
        }
        
        const result = await db.collection("phones").updateOne({ Email: form.email }, update);

        res.status(200);
        res.send(result);
    }
    catch{
        res.status(500);
        res.send("Unexpected error");
    }
}); 

