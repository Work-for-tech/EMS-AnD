const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({

    // projectId, preson_name, contractor_name, Date, sub-component,qty, remark

    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'project',
        required: true,
    },
    person_name: {
        type: String,
        required: true,
    },
    contractor_name: {
        type: String,
        required: true,
    },
    items: [{
        subComponent: {
            type: mongoose.Types.ObjectId,
            ref: 'offersubcomponent',
            required: true,
        },
        qty_issued: {
            type: Number,
            required: true,
        },
    }],
    remarks: {
        type: String,
    },
}, { timestamps: true })

module.exports = mongoose.model('issue', issueSchema)