const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accessSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.ObjectId,
            ref: 'employee'
        },
        moduleName: [{
            type: String
        }]
    }
)

module.exports = mongoose.model('access', accessSchema)