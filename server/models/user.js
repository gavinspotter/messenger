const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    messageboards: [{ type: mongoose.Types.ObjectId, required: true, ref: "messages" }]

})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("User", userSchema)