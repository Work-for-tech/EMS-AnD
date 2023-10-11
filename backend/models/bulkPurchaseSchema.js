const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema=new Schema({
    indentId:{
        type:Schema.Types.ObjectId,
        ref:'bulkindent'
    },
    vendorId:{
        type:mongoose.Types.ObjectId,
        ref:'vendor'
    },
    items:[{
        subcomponent: {
            type: Schema.Types.ObjectId,
            ref: 'offersubcomponent'
        },
        quantity:{
            type:"Number"
        },
    }],
    emailSent:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('bulkpurchase',purchaseSchema)