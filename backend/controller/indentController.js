const indentSchema = require('../models/indentSchema')
const bulkIndentSchema = require('../models/bulkIndentSchema')

module.exports.addIndentUsingPid = (async (req, res) => {
    try {
        //body
        // {
        //     "clientId":"6502175b65e30d71f884e616",
        //     "projectId":"6505c367e8efb2ef88fb4c90",
        // "items":[{
        //     "subcomponent":"65031adc37efe09a975be9b1",
        //     "quantityRequired":1,
        //     "quantityOrdered":20
        // }
        // ]
        // }
        console.log(req.body)
        var data = await indentSchema.updateOne({ projectId: req.body.projectId, purchased: false }, { $set: req.body }, { upsert: true }).exec()
        console.log(data.upsertedCount > 0 || data.modifiedCount > 0)

        if (data.upsertedCount > 0) {
            res.status(200).json({ message: 'Indent updated' })
        }
        else if (data.modifiedCount > 0) {
            res.status(200).json({ message: 'Indent updated' })
        }
        else {
            res.status(400).json({ message: 'something went wrong' })
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error in updating indent",
            data: error,
        });
    }
})

module.exports.addBulkIndent = (async (req, res) => {
    try {
        /*
        req.body to send
        "items":[{
                "subcomponent":"65031adc37efe09a975be9b1",
                "quantityRequired":1,
                "quantityOrdered":20
            }
            ]
        */
        var data = await bulkIndentSchema.create(req.body)
        if (data != null) {
            res.status(200).json({ message: 'Buklk Indent Created', data: data })
        }
        else {
            res.status(400).json({ message: 'something went wrong' })
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error in updating indent",
            data: error,
        });
    }
})

module.exports.getIndentbypid = (async (req, res) => {
    try {
        var data = await indentSchema.find({ projectId: req.params.projectId, clientId: req.params.clientId }).populate('projectId').populate('clientId').populate({ path: 'items.subcomponent' })
        if (data != null) {
            res.status(200).json({ message: 'Indent fetched', data: data })
        }
        else {
            res.status(400).json({ message: 'required data not found' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error in updating indent",
            data: error,
        });
    }
})

module.exports.getBulkIndentForPurchase = (async (req, res) => {
    try {
        var data = await bulkIndentSchema.find({ purchased: false }).populate({ path: 'items.subcomponent' })
        if (data != null) {
            res.status(200).json({ message: 'Indent fetched', data: data })
        }
        else {
            res.status(400).json({ message: 'required data not found' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error in updating indent",
            data: error,
        });
    }
})

module.exports.GetBothIndentForList = (async (req, res) => {
    try {
        var bulkData = await bulkIndentSchema.find().populate({ path: 'items.subcomponent' })
        var indentDataByPid = await indentSchema.find().populate('projectId').populate('clientId').populate({ path: 'items.subcomponent' })

        if (bulkData != null && indentDataByPid != null) {
            res.status(200).json({ message: 'Indent fetched', bulkData: bulkData, indentDataByPid: indentDataByPid })
        }
        else {
            res.status(400).json({ message: 'required data not found' })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Error in updating indent",
            data: error,
        });
    }
})