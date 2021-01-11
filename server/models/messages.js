const mongoose = require("mongoose")

const Schema = mongoose.Schema

const messageSchema = new Schema({
    message: { type: String, required: true },
    messageboard: { type: mongoose.Types.ObjectId, required: true, ref: "MessageBoard" }
})

module.exports = mongoose.model("Messages", messageSchema)

