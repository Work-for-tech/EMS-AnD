const mongoose = require('mongoose')
const Schema = mongoose.Schema

const offerRevisionSchema = new Schema({

    project_id: {
        type:Schema.Types.ObjectId,
        ref:'project'
    },
    
    offer_id: {
        type: Schema.Types.ObjectId,
        ref: 'offer'
    },

    revisions: [{
        Date:{
            type:Schema.Types.Date,
            default:Date.now()
        },
        data_before_revision:{
            type:Object,
        }
    }]

})

module.exports = mongoose.model('revision',offerRevisionSchema) 