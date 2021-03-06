const mongoose = require("mongoose")

const Schema = mongoose.Schema

const messageboardSchema = new Schema({
    messages: [{ type: mongoose.Types.ObjectId, ref: "Messages" }],
    chat: [{ type: mongoose.Types.ObjectId, required: true, ref: "User" }]
})


module.exports = mongoose.model("MessageBoard", messageboardSchema)
