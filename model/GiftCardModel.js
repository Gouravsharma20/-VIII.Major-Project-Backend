const mongoose = require("mongoose")



const giftCardModel = new mongoose.Schema({
    giftCardTitle:{type:String,require:true},
    giftCardImage:{type:String,require:true},
    giftCardNumber:{type:String,required:true},
    giftCardPin:{type:String,required:true},
    redemptionType:{type:String,enum:['Online', 'Offline', 'Both'],required:true},
    giftCardexpiryDate:{type:Date,required:true},
    giftCardBalance:{type:Number,required:true},
    redemptionTerms:{type:String,required:true},
    giftCardCategory:{type:String,enum:['shopping', 'jewellery', 'fashion','electronics','travel','others'],required:true}
},{timestamps:true})



const GiftCard = mongoose.model("GiftCard",giftCardModel)

module.exports = GiftCard