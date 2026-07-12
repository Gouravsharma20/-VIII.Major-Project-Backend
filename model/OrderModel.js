const { default: mongoose } = require("mongoose")
const momngoose = require("mongoose")

const OrderSchema = new mongoose.Schema({
    items:[{
        _id:String,
        giftCardTitle:{type:String,require:true},
        redemptionType:{type:String,enum:['Online','Offline', 'Both']},
        giftCardBalance:{type:Number,required:true},
        redemptionTerms:{type:String},
        quantity:{type:Number,required:true},
    }],
    totalAmount: { type: Number, required: true }
},{ timestamps: true })

module.exports = mongoose.model("Order", OrderSchema);