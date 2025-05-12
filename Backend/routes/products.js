const express = require("express");
const router = express.Router();
var fs = require("fs");
var bodyParser = require("body-parser");
router.use(bodyParser.json());

router.get("/products", async (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync("routes/phone.json"));
    res.status(200);
    res.send(data.products);
  } catch {
    res.status(500);
    res.send("Error");
  }
});

module.exports = router;
