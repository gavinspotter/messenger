const mongoose = require("mongoose")

const Schema = mongoose.Schema

const messageSchema = new Schema({
    message: { type: String, required: true },
})

module.exports = mongoose.model("Messages", messageSchema)

