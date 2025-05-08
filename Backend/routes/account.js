const express = require('express');
const router = express.Router();


//connect to mongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "phones";
const { MongoClient } = require("mongodb");
const client = new MongoClient(url);
const db = client.db(dbName);


//Post request to sign up
router.post("/signup", async (req, res) => {
    await client.connect();
    console.log("Node connected successfully to POST MongoDB");

    const user = req.body;

    try {

        const exist = await db.collection("phones").findOne({ Email: user.Email });

        if (exist) {
            res.status(400);
            res.send("Email is already in use");
        }

        const newuser = await db.collection("phones").insertOne(user);
        console.log("User signed up: ", newuser);
        res.status(200);
        res.send("User signed up!");

    }
    catch (e) {
        res.status(500);
        res.send("Error sending to MongoDB");
    }

    res.status(200);
});

//Get request to sign up
router.post("/login", async (req, res) => {
    await client.connect();
    console.log("Connected with MongoDB");

    const user = req.body;

    try {
        const check = await db.collection("phones").findOne({ Email: user.Email });

        if (!check) {
            res.status(400);
            res.send("Email does not exist");
        }
        else {
            if (check.Password === user.password) {
                res.status(200);
                res.send(check);
            }
            else {
                res.status(401);
                res.send("Incorrect password");
            }
        }
    }
    catch {
        res.status(500);
        res.send("Could not send to mongoDB");
    }
});

//change the password, or email, or username
router.put("/change/:email", async (req, res) => {
    await client.connect();
    console.log("Connected with MongoDB");

    const user = req.body;
    const email = req.params.email;


    try {

        const update = {
            $set: {
                Name: user.Name,
                Email: user.Email
            }
        }

        const result = await db.collection("phones").updateOne({ Email: email }, update);

        console.log(result);

        res.status(200);
        res.send(result);
    }
    catch {
        res.status(500);
        res.send("Something went wrong");
    }
});
//delete
router.delete("/account/:email", async(req, res) => {
    await client.connect();
    console.log("Connected with MongoDB");

    try{
        const result = await db.collection("phones").deleteOne({ Email: req.params.email });

        res.status(200);
        res.send(result);
    }
    catch{
        res.status(500);
        res.send("Account delete");
    }

});

module.exports = router;
