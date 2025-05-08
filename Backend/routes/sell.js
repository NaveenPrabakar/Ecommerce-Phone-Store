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
router.post("/sell", async (req, res) => {
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

        const updatedUser = await db.collection("phones").findOne({ Email: form.email });

        res.status(200);
        res.send(updatedUser);
    }
    catch {
        res.status(500);
        res.send("Unexpected error");
    }
});

//Update
router.put("/fix/:id", async (req, res) => {//update information

    const form = req.body;
    const id = Number(req.params.id);

    try {
        const data = JSON.parse(fs.readFileSync("routes/phone.json"));
        const i = data.products.findIndex((d) => d.id == id);

        data.products[i] = form;
        data.products[i].id = id;

        fs.writeFileSync("routes/phone.json", JSON.stringify(data));

        res.status(200);
        res.send(data.products[i]);
    }
    catch{
        res.status(500);
        res.send("Something went wrong");
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
            return;
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

//delete the sold item
router.delete("/done/:id/:email", async (req, res) => {
    await client.connect();
    console.log("Connected with MongoDB");

    const email = req.params.email;
    const id = Number(req.params.id);

    console.log(id);

    try {
        const check = await db.collection("phones").findOne({ Email: email });

        const temp = [];
        for (let i = 0; i < check.sell.length; i++) {
            if (check.sell[i] !== id) {
                temp.push(check.sell[i]);
            }
        }

        console.log(temp);

        const update = {
            $set: {
                sell: temp
            }
        }

        const result = await db.collection("phones").updateOne({ Email: email }, update);

        const data = JSON.parse(fs.readFileSync("routes/phone.json"));

        data.products = data.products.filter(item => Number(item.id) !== id);

        fs.writeFileSync("routes/phone.json", JSON.stringify(data));

        const updatedUser = await db.collection("phones").findOne({ Email: email });

        res.status(200);
        res.send(updatedUser);

    } catch {
        res.status(500);
        res.send("Error");
    }
})


module.exports = router;
