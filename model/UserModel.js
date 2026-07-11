const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    pincode: { type: String, required: true },
    locality: { type: String, required: true },
    houseNo: { type: String, required: true },
    flatOrBuilding: { type: String },
    landmark: { type: String },
    district: { type: String, required: true },
    state: { type: String, required: true },
    addressType: { type: String, enum: ['Home', 'Work', 'Others'], required: true },
    isDefault: { type: Boolean, default: false }
}, { timestamps: true })

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    addresses: [addressSchema],
}, { timestamps: true })

module.exports = mongoose.model("User", UserSchema)