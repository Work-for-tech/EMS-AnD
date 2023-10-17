const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const purchaseSchema=new Schema({
    indentId:{
        type:Schema.Types.ObjectId,
        ref:'indent'
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
    },
    sGst:{
        type:Number
    },
    cGst:{
        type:Number
    },
    paymentTerms:{
        type:Number
        // here it should be dropdown where all option has after 1 Day , After 1 week ,after 2 Week ,After 3 Week ,After 1 Month and After 6 months
        // so value should be 1,7,14 ...
    },
    tandc:{
        type:String
    },
    deliveryAddress:{
        type:String
    },
    transportationCost:{
        type:Number
    },
    packingCost:{
        type:Number
    },
    otherCost:{
        type:Number
    },
    grandTotal:{
        type:Number
    },
    preparedBy:{
        type:Schema.Types.ObjectId,
        ref:"employee"
    },
    authorizedBy:{
        type:Schema.Types.ObjectId,
        ref:"employee"
    }
})

module.exports=mongoose.model('purchase',purchaseSchema)