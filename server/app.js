const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const HttpError = require("./models/HttpError")

const app = express()

app.use(bodyParser.json())


app.use((req, res, next) => {
    const error = new HttpError("could not find this route", 404);
    throw error;
});



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
