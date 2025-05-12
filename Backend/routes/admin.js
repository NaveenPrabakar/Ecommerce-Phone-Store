const express = require("express");
const router = express.Router();
var fs = require("fs");
var bodyParser = require("body-parser");
router.use(bodyParser.json());

router.delete("/adminremove/:id", async (req, res) => {
  const id = Number(req.params.id);

  try {
    const data = JSON.parse(fs.readFileSync("routes/phone.json"));

    data.products = data.products.filter((item) => Number(item.id) !== id);

    fs.writeFileSync("routes/phone.json", JSON.stringify(data));

    res.status(200);
    res.send(data)
  } catch {
    res.status(500);
    res.send("Error");
  }
});

module.exports = router;
