const express = require('express');
const router = express.Router();
var fs = require("fs");
var bodyParser = require("body-parser");



//connect to mongoDB
const url = "mongodb://127.0.0.1:27017";
const dbName = "phones";
const { MongoClient } = require("mongodb");
const client = new MongoClient(url);
const db = client.db(dbName);
router.use(bodyParser.json());



//updating what the person is selling
router.put("/sell", async (req, res) => {
    await client.connect();
    console.log("Connected with MongoDB");

    const form = req.body;
    const data = JSON.parse(fs.readFileSync("routes/phone.json")); //Save the phone data as json object

    let id = data.products[data.products.length - 1].id + 1; //get a new unique id for the sell product
    data.products.push(form); //submit the infromation to the json
    form.id = id;

    console.log(id);

    fs.writeFileSync("routes/phone.json", JSON.stringify(data)); //write back to the file

    try {
        const check = await db.collection("phones").findOne({ Email: form.email });
        console.log(check);
        check.sell.push(id);

        const update = {
            $set: check
        }

        const result = await db.collection("phones").updateOne({ Email: form.email }, update);

        res.status(200);
        res.send(result);
    }
    catch {
        res.status(500);
        res.send("Unexpected error");
    }
});

//get request to get all the sold items
router.get("/sold/:email", async (req, res) => {

    await client.connect();
    console.log("Connected with MongoDB");

    const email = req.params.email;

    try {
        const check = await db.collection("phones").findOne({ Email: email });

        console.log(check.sell);

        if (check.sell.length == 0) {
            res.status(402);
            res.send([]);
        }

        const data = JSON.parse(fs.readFileSync("routes/phone.json"));
        
        console.log(data);

        const sold = [];

        for (let i = 0; i < check.sell.length; i++) {
            for (let j = 0; j < data.products.length; j++) {
                if (check.sell[i] == data.products[j].id) {
                    sold.push(data.products[j]);
                }
            }
        }

        res.status(200);
        res.send(sold);
    }
    catch {
        res.status(500);
        res.send("Something went wrong");
    }
});


module.exports = router;
