const mongoose = require("mongoose")

const Schema = mongoose.Schema

const messageSchema = new Schema({
    messsage: { type: String, required: true },
    chat: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }]
})

