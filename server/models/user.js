const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique },
    password: { type: String, required: true, trim: true },
    messages: [{ type: mongoose.Types.ObjectId, required: true, ref: "messages" }]

})
