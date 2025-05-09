const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');


//open AI key
const client = new OpenAI({ apiKey: "key" });

router.post("/chat", async (req, res) => {

    const text = "You work at a phone shop and are to assist people. Any irrelevent questions asked should be replied with: I'm sorry I can't understand." + req.body.text;

    const response = await client.responses.create({
        model: "gpt-3.5-turbo",
        input: text
    });

    res.send(response.output_text);
})

module.exports = router;