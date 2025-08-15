const express = require('express');
const router = express.Router();
var fs = require("fs");
var bodyParser = require("body-parser");



//connect to mongoDB
const url = process.env.MONGO_URL;
const dbName = "phones";
const { MongoClient } = require("mongodb");
const client = new MongoClient(url);
const db = client.db(dbName);
router.use(bodyParser.json());



router.post("/additem/:email", async (req, res) => {
    await client.connect();
    console.log("Connected with MongoDB");

    const email = req.params.email;
    const item = req.body;
    

    try {
        const check = await db.collection("phones").findOne({ Email: email });
        console.log(check);
        check.cart.push(item.id);

        const update = {
            $set: check
        }

        const result = await db.collection("phones").updateOne({ Email: email }, update);

        const updatedUser = await db.collection("phones").findOne({ Email: email });

        res.status(200);
        res.send(updatedUser);
    }
    catch {
        res.status(500);
        res.send("Error");
    }
});

router.delete("/removeitem/:email/:id", async (req, res) => {
    await client.connect();
    console.log("Connected with MongoDB");

    const email = req.params.email;
    const id = Number(req.params.id);
    

    try {
        const check = await db.collection("phones").findOne({ Email: email });

        const temp = [];
        let i;
        for (i = 0; i < check.cart.length; i++) {
            if (check.cart[i] !== id) {
                temp.push(check.cart[i]);
            }
            else{
                break
            }
        }
        for(i = i + 1; i < check.cart.length; i++){
            temp.push(check.cart[i])
        }

        const update = {
            $set: {
                cart: temp
            }
        }

        const result = await db.collection("phones").updateOne({ Email: email }, update);

        const updatedUser = await db.collection("phones").findOne({ Email: email });

        res.status(200);
        res.send(updatedUser);
    }
    catch {
        res.status(500);
        res.send("Error");
    }
});

router.delete("/removeall/:email", async (req, res) => {
    await client.connect();
    console.log("Connected with MongoDB");

    const email = req.params.email;
    const id = Number(req.params.id);
    

    try {
        const check = await db.collection("phones").findOne({ Email: email });

        const update = {
            $set: {
                cart: []
            }
        }

        const result = await db.collection("phones").updateOne({ Email: email }, update);

        res.status(200);
        
    }
    catch {
        res.status(500);
        res.send("Error");
    }
});

router.get("/getcart/:email", async (req, res) => {

    await client.connect();
    console.log("Connected with MongoDB");

    const email = req.params.email;

    try {
        const check = await db.collection("phones").findOne({ Email: email });

        const cart = [];

        const data = JSON.parse(fs.readFileSync("routes/phone.json"));

        for (let i = 0; i < data.products.length; i++){
            for (let j = 0; j < check.cart.length; j++){
                if (data.products[i].id == check.cart[j]){
                    cart.push(data.products[i]);
                }
            }
        }

        res.status(200);
        res.send(cart);
    }
    catch {
        res.status(500);
        res.send("Error");
    }
});




module.exports = router;
