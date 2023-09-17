const mongoose = require("mongoose")

const machineSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        message: "Machine name is required."
    }
})

module.exports = mongoose.model("machine", machineSchema)