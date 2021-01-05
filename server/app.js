const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())



mongoose
    .connect(
        "mongodb+srv://gavin:Password123@cluster0.d3tnt.mongodb.net/messenger?retryWrites=true&w=majority"
    )
    .then(() => {
        app.listen(5000);
    })
    .catch((err) => {
        console.log(err);
    });
