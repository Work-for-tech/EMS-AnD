const mongoose = require("mongoose")

const modelByMachine = new mongoose.Schema({
    modelNo: {
        required: true,
        type: String,
        unique: true,
        message: "Model number is required and it should be unique machine wise."
    },
    machineCompanyName: {
        required: true,
        type: String,
        message: "Machine Company Name is required."
    },
    purchaseDate: {
        required: true,
        type: String,
        message: "Purchase date is required."
    },
    mntDueDate: {
        required: true,
        type: String,
        message: "Maintenance due date is required."
    },
    invoice: {
        required: true,
        type: String,
        message: "Invoice is required."
    },
    remarks: {
        type: String,
    },
    machineId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "machine"  
    }
})

module.exports = mongoose.model("modelByMachine", modelByMachine)