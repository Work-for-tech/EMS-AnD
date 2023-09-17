const mongoose = require("mongoose")

const clientSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        unique:true,
        message: "user name is required."
    },
    GSTNo: {
        required: true,
        type: String,
        unique:true,
        message: "GST number is required."
    },
    phoneNumber: {
        required: true,
        type: Number,
        message: "Phone number is required."
    },
    phoneNumber2: {
        type: Number,
    },
    email: {
        required: true,
        type: String,
        unique:true,
        message: "Email is required."
    },
    email2: {
        type: String
    },
    panNumber: {
        required: true,
        type: String,
        unique:true,
        message: "PAN number is required."
    },
    address: {
        required: true,
        type: String,
        message: "Address is required."
    }  
})

module.exports = mongoose.model("client", clientSchema)