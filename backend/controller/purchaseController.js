const purchaseSchema = require('../models/purchaseSchema')
const indent = require('../models/indentSchema')
const mongoose = require("mongoose")

module.exports.addPurchase = (async (req, res) => {
    try {
        /*
    {
        "indentId":"6521527bf967cec5ec794db6",
        "vendor":"650c9727c8de1ebe59c069cc",
        "items":[{"subcomponent":"6503e2b2762dd2848d2ed165","quantity":20,"_id":"6521527bf967cec5ec794db7"}]
    }
    */
        var body = await purchaseSchema.create(req.body)
        if (body != null) {
            req.body.items.map(async (e) => {
                console.log(e.subcomponent)
                const indents = await indent.findOneAndUpdate(
                    { _id: req.body.indentId, 'items.subcomponent': e.subcomponent },
                    { $set: { 'items.$.purchased': true } },
                    { new: true }
                );
            })
            res.status(200).json({ message: "Success", data: body })
        }
        else {
            res.status(400).json({ message: "wrong happened" })
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error in adding purchase",
            data: error,
        });
    }

})

module.exports.getPurchaseList = (async (req, res) => {
    try {
        var data = await purchaseSchema.find({indentId:req.params.indentId}).populate({path:'indentId',select:"clientId projectId"}).populate("vendor").populate({ path: 'items.subcomponent' })
        console.log(data)
        res.status(200).json({message:"fetched",data:data})
    }
    catch(error)
    {
        res.status(500).json({
            message: "Error in fetching purchase",
            data: error,
        });
    }
})

module.exports.getParticularPurchase=(async(req,res)=>{
    try {
        var data = await purchaseSchema.findById(req.body.id).populate({path:'indentId',select:"clientId projectId"}).populate("vendor").populate({ path: 'items.subcomponent' })
        console.log(data)
        res.status(200).json({message:"fetched",data:data})
    }
    catch(error)
    {
        res.status(500).json({
            message: "Error in fetching purchase",
            data: error,
        });
    }
})