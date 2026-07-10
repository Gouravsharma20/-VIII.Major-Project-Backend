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
    giftCardCategory:{type:String,enum:['shopping', 'jewellery', 'fashion','electronics','travel','others'],required:true},
    adress:{}
},{timestamps:true})


const addressSchema = new mongoose.Schema({
    pincode: { type: String, required: true },
    locality: { type: String, required: true },
    houseNo: { type: String, required: true },
    flatOrBuilding: { type: String },
    landmark: { type: String },
    district: { type: String, required: true },
    state: { type: String, required: true },
    addressType: { type: String, enum: ['Home', 'Work', 'Others'], required: true }
}, { _id: true })

const GiftCard = mongoose.model("GiftCard",giftCardModel)

module.exports = GiftCard