const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")


const userRoutes = require("./routes/user-routes")
const messageRoutes = require("./routes/messages-routes")
const HttpError = require("./models/HttpError")

const app = express()

app.use(bodyParser.json())


//app.use(express.static(path.join('public')))

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

    next();
});



app.use("/api/user", userRoutes)

app.use("/api/messages", messageRoutes)

// app.use((req, res, next) => {
//     res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
// })


app.use((req, res, next) => {
    const error = new HttpError("could not find this route", 404);
    throw error;
});


app.use((error, req, res, next) => {
    if (res.headerSent) {
        return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || "an unknown error occured" });
});



mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.d3tnt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(process.env.PORT || 5000);
    })
    .catch((err) => {
        console.log(err);
    });
