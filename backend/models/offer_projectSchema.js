const mongoose = require('mongoose')
const Schema=mongoose.Schema

const offer_projectSchema = new Schema({

    projectId:{
        type:Schema.Types.ObjectId,
        unique:true,
        required:true,
    },

    offers: [{
        offer_id: {
            type: Schema.Types.ObjectId,
            ref: 'offer'
        },
        is_final: {
            type:Boolean,
            default:false,
        }
    }],
    
})

module.exports = mongoose.model('offer_project',offer_projectSchema)