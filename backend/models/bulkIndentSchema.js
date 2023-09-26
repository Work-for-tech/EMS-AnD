const mongoose = require("mongoose")
const Schema = mongoose.Schema

const bulkIndentSchema=new Schema({
    items: [{
        subcomponent: {
            type: Schema.Types.ObjectId,
            ref: 'offersubcomponent'
        },
        quantityRequired: {
            type:"Number"
        },
        quantityOrdered:{
            type:"Number"
        }
    }],
    purchased:{
        type:"Boolean",
        default:false
    }
})

module.exports=mongoose.model('bulkindent',bulkIndentSchema)