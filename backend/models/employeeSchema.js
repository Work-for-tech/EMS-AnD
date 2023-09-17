const mongoose = require("mongoose")

const employee = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        message: "user name is required."
    },
    phoneNumber: {
        required: true,
        type: Number,
        message: "Phone number is required."
    },
    phoneNumber2: {
        type: Number
    },
    email: {
        required: true,
        type: String,
        message: "Email is required."
    },
    email2: {
        type: String
    },
    address: {
        required: true,
        type: String,
        message: "Address is required."
    },
    designation: {
        required: true,
        type: String,
        message: "Designation is required."
    },
    department: {
        required: true,
        type: String,
        message: "Department is required."
    }
})

module.exports = mongoose.model("employee", employee);